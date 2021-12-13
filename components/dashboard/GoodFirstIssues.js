import { Fragment, useState } from 'react';
import Table from './table/Table';

function filterIssues(issues, selectedRepo, selectedArea) {
  let result = issues;
  if (selectedRepo !== 'Repository - All') {
    result = result.filter((issue) => issue.repo === selectedRepo);
  }
  if (selectedArea !== 'Area - All') {
    result = result.filter((issue) => issue.area === selectedArea);
  }
  return result;
}
function GoodFirstIssues(props) {
  const [issues] = useState(props.issues);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage] = useState(5);
  const [selectedRepo, setSelectedRepo] = useState('Repository - All');
  const [selectedArea, setSelectedArea] = useState('Area - All');

  //Get current issues
  const filteredIssues = filterIssues(issues, selectedRepo, selectedArea);
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(
    indexOfFirstIssue,
    indexOfLastIssue
  );

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Fragment>
      <Table
        title="Good First Issues"
        filters={[
          {
            listener: setSelectedRepo,
            values: [
              'Repository - All',
              ...new Set(filteredIssues.map((issue) => issue.repo)),
            ],
          },
          {
            listener: setSelectedArea,
            values: [
              'Area - All',
              ...new Set(filteredIssues.map((issue) => issue.area)),
            ],
          },
        ]}
        paginationOptions={{
          issuesPerPage: issuesPerPage,
          totalIssues: filteredIssues.length,
          currentPage: currentPage,
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
          };
        })}
      />
    </Fragment>
  );
}
export default GoodFirstIssues;
