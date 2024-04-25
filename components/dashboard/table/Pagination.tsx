import React from 'react';

import Button from '../Button';

interface PaginationProps {
  issuesPerPage: number;
  currentPage: number;
  totalIssues: number;
  paginate: (pageNumber: number) => void;
}

/**
 * @description Pagination component.
 *
 * @param {PaginationProps} props - The props for the component.
 * @param {number} props.issuesPerPage - The number of issues per page.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalIssues - The total number of issues.
 * @param {(pageNumber: number) => void} props.paginate - The function to paginate.
 */
export default function Pagination({ issuesPerPage, currentPage, totalIssues, paginate }: PaginationProps) {
  const pageNumbers = [];
  const lowerBound = Math.min(currentPage * issuesPerPage - issuesPerPage + 1, totalIssues);
  const upperBound = Math.min(currentPage * issuesPerPage, totalIssues);

  for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex flex-col items-center border-t bg-white p-5 xs:flex-row xs:justify-between'>
      <span className='text-xs text-gray-900 xs:text-sm'>
        Showing {lowerBound} to {upperBound} {''}
        of {totalIssues} Issues
      </span>
      <div className='mt-2 inline-flex xs:mt-0'>
        <Button
          text='Prev'
          data-testid='Pagination-prev-button'
          onClick={(event) => {
            event.preventDefault();
            if (currentPage - 1) paginate(currentPage - 1);
          }}
        />
        {pageNumbers.map((number) => (
          <Button
            data-testid={`Pagination-page-button-${number}`}
            key={number}
            text={number.toString()}
            onClick={(event) => {
              event.preventDefault();
              paginate(number);
            }}
          />
        ))}
        <Button
          text='Next'
          data-testid='Pagination-next-button'
          onClick={(event) => {
            event.preventDefault();
            if (currentPage < totalIssues / issuesPerPage) {
              paginate(currentPage + 1);
            }
          }}
        />
      </div>
    </div>
  );
}
