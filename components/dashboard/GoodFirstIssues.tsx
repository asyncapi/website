import React, { useState } from 'react';

import type { Issue } from '@/types/components/dashboard/TableTypes';

import GoodFirstIssuesTip from './GoodFirstIssuesTip';
import Filters from './table/Filters';
import Table from './table/Table';

interface FiltersType {
  selectedRepo: string;
  selectedArea: string;
}

interface GoodFirstIssuesProps {
  issues: Issue[];
}

/**
 * @description Filter issues based on selected repo and area.
 *
 * @param {Issue[]} issues - The list of issues to filter.
 * @param {FiltersType} filters - The filters to apply.
 * @returns {Issue[]} The filtered list of issues.
 */
export function filterIssues(issues: Issue[], filters: FiltersType): Issue[] {
  let result = issues;

  if (filters.selectedRepo !== 'Repository - All') {
    result = result.filter((issue) => issue.repo === filters.selectedRepo);
  }
  if (filters.selectedArea !== 'Area - All') {
    result = result.filter((issue) => issue.area === filters.selectedArea);
  }

  return result;
}

/**
 * @description Component that displays a list of good first issues.
 *
 * @param {GoodFirstIssuesProps} props - The props for the component.
 * @param {Issue[]} props.issues - The list of good first issues.
 */
export default function GoodFirstIssues({ issues }: GoodFirstIssuesProps) {
  const [selectedRepo, setSelectedRepo] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');

  // Get current issues

  let filteredIssues = issues;

  const allIssues = issues;

  if (selectedRepo !== 'All') {
    filteredIssues = filteredIssues.filter((issue) => issue.repo === selectedRepo);
  }
  if (selectedArea !== 'All') {
    filteredIssues = filteredIssues.filter((issue) => issue.area === selectedArea);
  }

  return (
    <Table
      title={
        <div className='flex gap-3' data-testid='GoodFirstIssues-main-div'>
          <span>Good First Issues</span>
          <GoodFirstIssuesTip />
          <Filters
            className='ml-auto'
            data-testid='GoodFirstIssues-filter-component'
            issues={filteredIssues}
            allIssues={allIssues}
            setSelectedRepo={setSelectedRepo}
            setSelectedArea={setSelectedArea}
            selectedArea={selectedArea}
            selectedRepo={selectedRepo}
          />
        </div>
      }
      data={filteredIssues.slice(0, 24)}
      className='grow'
      listClassName='lg:grid-cols-2'
    />
  );
}
