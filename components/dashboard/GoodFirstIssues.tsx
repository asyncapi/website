import { useState } from 'react';
import Table from './table/Table';
import GoodFirstIssuesTip from './GoodFirstIssuesTip';
import Filters from './table/Filters';
import { Issue } from '@/types/components/dashboard/TableTypes';

interface FiltersType {
  selectedRepo: string;
  selectedArea: string;
};

interface GoodFirstIssuesProps {
  issues: Issue[];
};

export function filterIssues(issues: Issue[], filters: FiltersType) {
  let result = issues;
  if (filters.selectedRepo !== 'Repository - All') {
    result = result.filter((issue) => issue.repo === filters.selectedRepo);
  }
  if (filters.selectedArea !== 'Area - All') {
    result = result.filter((issue) => issue.area === filters.selectedArea);
  }
  return result;
}

export default function GoodFirstIssues({ issues }: GoodFirstIssuesProps) {
  const [selectedRepo, setSelectedRepo] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');

  //Get current issues

  let filteredIssues = issues;
  let allIssues = issues
  if (selectedRepo !== 'All') {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.repo === selectedRepo
    );
  }
  if (selectedArea !== 'All') {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.area === selectedArea
    );
  }
  return (
    <Table
      title={
        <div className="flex gap-3" data-testid="GoodFirstIssues-main-div">
          <span>Good First Issues</span>
          <GoodFirstIssuesTip />
          <Filters
            className="ml-auto"
            data-testid="GoodFirstIssues-filter-component"
            issues={filteredIssues}
            allIssues={issues}
            setSelectedRepo={setSelectedRepo}
            setSelectedArea={setSelectedArea}
            selectedArea={selectedArea}
            selectedRepo={selectedRepo}
          />
        </div>
      }
      data={filteredIssues.slice(0, 24)}
      className="flex-grow"
      listClassName="lg:grid-cols-2"
    />
  );
};
