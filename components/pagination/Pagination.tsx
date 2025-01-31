import React from 'react';

import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

import Button from '../buttons/Button';
import IconNext from '../icons/Next';
import IconPrevious from '../icons/Previous';
import PaginationItem from './PaginationItem';

export interface PaginationProps {
  // eslint-disable-next-line prettier/prettier

  /** Total number of pages */
  totalPages: number;

  /** Current active page */
  currentPage: number;

  /** Function to handle page changes */
  onPageChange: (page: number) => void;
}

/**
 * This is the Pagination component. It displays a list of page numbers that can be clicked to navigate.
 */
export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  /**
   * @returns number of pages shows in Pagination.
   */
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];

    if (currentPage > 3) {
      pages.push('ellipsis1');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis2');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav role='navigation' aria-label='Pagination' className='font-inter flex items-center justify-center gap-8'>
      {/* Previous button */}
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`font-normal flex h-[34px] items-center justify-center rounded bg-white px-3 py-[7px] text-sm leading-[17px] tracking-[-0.01em] ${
          currentPage === 1 ? 'hover:bg-gray-white cursor-not-allowed text-gray-300' : 'text-[#141717] hover:bg-gray-50'
        }`}
        text='Previous'
        icon={<IconPrevious />}
        iconPosition={ButtonIconPosition.LEFT}
        aria-label='Go to previous page'
      />

      {/* Page numbers */}
      <div className='flex gap-2' role='list'>
        {getPageNumbers().map((page) =>
          typeof page === 'number' ? (
            <PaginationItem
              key={page}
              pageNumber={page}
              isActive={page === currentPage}
              onPageChange={handlePageChange}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            />
          ) : (
            <span
              key={page}
              className='font-inter flex size-10 items-center justify-center text-sm font-semibold text-[#6B6B6B]'
              aria-hidden='true'
            >
              ...
            </span>
          )
        )}
      </div>

      {/* Next button */}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`font-normal flex h-[34px] items-center justify-center rounded bg-white px-3 py-[7px] text-sm leading-[17px] tracking-[-0.01em] ${
          currentPage === totalPages
            ? 'hover:bg-gray-white cursor-not-allowed text-gray-300'
            : 'text-[#141717] hover:bg-gray-50'
        }`}
        text='Next'
        icon={<IconNext />}
        aria-label='Go to next page'
      />
    </nav>
  );
}
