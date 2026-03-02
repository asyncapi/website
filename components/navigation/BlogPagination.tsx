import React from 'react';

import type { BlogPaginationProps } from '@/types/components/navigation/BlogPaginationProps';

/**
 * Generates an array of page numbers with ellipsis for large page counts.
 */
function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];
  const showEllipsisThreshold = 7;

  if (totalPages <= showEllipsisThreshold) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);
  }

  return pages;
}

/**
 * @description Pagination component for the blog page.
 * Provides navigation controls to browse through paginated blog posts.
 */
export default function BlogPagination({
  currentPage,
  totalPages,
  totalPosts,
  postsPerPage,
  onPageChange
}: BlogPaginationProps) {
  const startPost = (currentPage - 1) * postsPerPage + 1;
  const endPost = Math.min(currentPage * postsPerPage, totalPosts);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row'
      aria-label='Blog pagination'
      data-testid='blog-pagination'
    >
      <p className='text-sm text-gray-600'>
        Showing <span className='font-medium'>{startPost}</span> to <span className='font-medium'>{endPost}</span> of{' '}
        <span className='font-medium'>{totalPosts}</span> posts
      </p>

      <div className='flex items-center gap-1'>
        <button
          type='button'
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className='rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent'
          aria-label='Go to previous page'
          data-testid='pagination-previous'
        >
          Previous
        </button>

        <div className='flex items-center gap-1'>
          {pageNumbers.map((page, index) =>
            typeof page === 'string' ? (
              <span key={`ellipsis-${index}`} className='px-2 text-gray-500'>
                {page}
              </span>
            ) : (
              <button
                key={page}
                type='button'
                onClick={() => onPageChange(page)}
                className={`min-w-[40px] rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === page ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                data-testid={`pagination-page-${page}`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          type='button'
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className='rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent'
          aria-label='Go to next page'
          data-testid='pagination-next'
        >
          Next
        </button>
      </div>
    </nav>
  );
}
