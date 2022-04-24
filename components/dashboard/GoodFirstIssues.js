import { useState } from 'react';
import Table from './table/Table';
import GoodFirstIssuesTip from './GoodFirstIssuesTip';
import Filters from './table/Filters';
function filterIssues(issues, filters) {
  let result = issues;
  if (filters.selectedRepo !== 'Repository - All')
    result = result.filter((issue) => issue.repo === filters.selectedRepo);
  if (filters.selectedArea !== 'Area - All')
    result = result.filter((issue) => issue.area === filters.selectedArea);
  return result;
}
function GoodFirstIssues({ issues }) {
  const [selectedRepo, setSelectedRepo] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');

  //Get current issues

  let filteredIssues = issues;
  console.log(filteredIssues, selectedRepo);
  if (selectedRepo !== 'All')
    filteredIssues = filteredIssues.filter(
      (issue) => issue.repo === selectedRepo
    );
  console.log(filteredIssues, selectedRepo);
  if (selectedArea !== 'All')
    filteredIssues = filteredIssues.filter(
      (issue) => issue.area === selectedArea
    );
  console.log(filteredIssues, selectedRepo);
  return (
    <Table
      title={
        <div className="flex gap-3">
          <span>Good First Issues</span>
          <GoodFirstIssuesTip />
          <Filters
            className="ml-auto"
            issues={filteredIssues}
            setSelectedRepo={setSelectedRepo}
            setSelectedArea={setSelectedArea}
            selectedArea={selectedArea}
            selectedRepo={selectedRepo}
          />
        </div>
      }
      data={filteredIssues.slice(0, 10)}
      className="flex-grow"
      listClassName="lg:grid-cols-2"
    />
  );
}
export default GoodFirstIssues;
