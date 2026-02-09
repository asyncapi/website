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
        <div className='flex items-center gap-3 w-full flex-wrap sm:flex-nowrap' data-testid='GoodFirstIssues-main-div'>
          <div className='flex items-center gap-3 flex-1 min-w-0'>
            <svg
              className='w-5 h-5 text-gray-700 dark:text-gray-300 flex-shrink-0'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
              />
            </svg>
            <span className='dark:text-white font-semibold truncate'>Good First Issues</span>
            <GoodFirstIssuesTip />
          </div>
          <Filters
            className='ml-auto sm:ml-auto flex-shrink-0 dark:bg-dark-background dark:border-gray-500'
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
      className='flex-1'
      listClassName='lg:grid-cols-2'
    />
  );
}
