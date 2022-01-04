import { Fragment, useState } from 'react';
import Table from './table/Table';

function filterIssues(issues, filters) {
  let result = issues;
  if (filters.selectedRepo !== 'Repository - All')
    result = result.filter((issue) => issue.repo === filters.selectedRepo);
  if (filters.selectedArea !== 'Area - All')
    result = result.filter((issue) => issue.area === filters.selectedArea);
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
            selected: state.filters.selectedRepo,
            listener: (repo) => applyFilter('selectedRepo', repo),
            values: [
              'Repository - All',
              ...new Set(filteredIssues.map((issue) => issue.repo)),
            ].map((repo) => {
              return { text: repo, value: repo };
            }),
          },
          {
            selected: state.filters.selectedArea,
            listener: (area) => applyFilter('selectedArea', area),
            values: [
              'Area - All',
              ...new Set(filteredIssues.map((issue) => issue.area)),
            ].map((area) => {
              return { text: area, value: area };
            }),
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
            area: item.area,
            repo: item.repo,
            isPR: false,
            resourcePath: item.resourcePath,
            labels: item.labels,
          };
        })}
      />
    </Fragment>
  );
}
export default GoodFirstIssues;
