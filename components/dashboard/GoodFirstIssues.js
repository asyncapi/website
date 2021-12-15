import { Fragment, useState } from 'react';
import Table from './table/Table';

function filterIssues(issues, filters) {
  let result = issues;
  if (filters.selectedRepo !== 'Repository - All')
    result = result.filter((issue) => issue.repo === filters.selectedRepo);
  if (filters.selectedArea !== 'Area - All')
    result = result.filter((issue) => issue.area === filters.selectedArea);
  if (filters.selectedComplexity !== 'Complexity - All')
    result = result.filter(
      (issue) => issue.complexity === filters.selectedComplexity
    );
  return result;
}
function GoodFirstIssues(props) {
  const issues = props.issues;
  const [state, setState] = useState({
    currentPage: 1,
    issuesPerPage: 7,
    filters: {
      selectedRepo: 'Repository - All',
      selectedArea: 'Area - All',
      selectedComplexity: 'Complexity - All',
    },
  });
  console.log(state.currentPage);
  //Get current issues
  const filteredIssues = filterIssues(issues, state.filters);
  const indexOfLastIssue = state.currentPage * state.issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - state.issuesPerPage;
  const currentIssues = filteredIssues.slice(
    indexOfFirstIssue,
    indexOfLastIssue
  );

  //change page
  const paginate = (pageNumber) =>
    setState({ ...state, currentPage: pageNumber });
  const applyFilter = (filter, value) => {
    setState({
      ...state,
      currentPage: 1,
      filters: { ...state.filters, [filter]: value },
    });
  };
  return (
    <Fragment>
      <Table
        title="Good First Issues"
        filters={[
          {
            listener: (repo) => applyFilter('selectedRepo', repo),
            values: [
              'Repository - All',
              ...new Set(filteredIssues.map((issue) => issue.repo)),
            ],
          },
          {
            listener: (area) => applyFilter('selectedArea', area),
            values: [
              'Area - All',
              ...new Set(filteredIssues.map((issue) => issue.area)),
            ],
          },
          {
            listener: (complexity) =>
              applyFilter('selectedComplexity', complexity),
            values: [
              'Complexity - All',
              ...new Set(filteredIssues.map((issue) => issue.complexity)),
            ],
          },
        ]}
        paginationOptions={{
          issuesPerPage: state.issuesPerPage,
          totalIssues: filteredIssues.length,
          currentPage: state.currentPage,
          paginate: paginate,
        }}
        data={currentIssues.map((item) => {
          return {
            id: item.id,
            title: item.title,
            author: item.author,
            isAssigned: item.isAssigned,
            conmplexity: item.complexity,
            area: item.area,
            repo: item.repo,
            isPR: false,
            resourcePath: item.resourcePath,
            complexity: item.complexity,
            labels: item.labels,
          };
        })}
      />
    </Fragment>
  );
}
export default GoodFirstIssues;
