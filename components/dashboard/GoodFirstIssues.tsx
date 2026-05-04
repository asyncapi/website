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

export function filterIssues(issues: Issue[], filters: FiltersType): Issue[] {
  let result = issues;

  if (filters.selectedRepo !== 'All') {
    result = result.filter((issue) => issue.repo === filters.selectedRepo);
  }
  if (filters.selectedArea !== 'All') {
    result = result.filter((issue) => issue.area === filters.selectedArea);
  }

  return result;
}

export default function GoodFirstIssues({ issues }: GoodFirstIssuesProps) {
  const [selectedRepo, setSelectedRepo] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');

  const filteredIssues = filterIssues(issues, { selectedRepo, selectedArea });

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
            allIssues={issues}
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
