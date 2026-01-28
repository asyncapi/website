import React, { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showGoToPage?: boolean;
  variant?: 'default' | 'simple' | 'compact';
  className?: string;
}

/**
 * @description Unified Pagination component with customizable display modes and "Go to page" dropdown
 * @param {PaginationProps} props - The props for the component
 * @param {number} props.currentPage - The current active page number
 * @param {number} props.totalPages - The total number of pages
 * @param {(page: number) => void} props.onPageChange - Callback function when page changes
 * @param {boolean} [props.showGoToPage=true] - Whether to show the "Go to page" dropdown
 * @param {'default' | 'simple' | 'compact'} [props.variant='default'] - Display variant
 * @param {string} [props.className=''] - Additional CSS classes
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showGoToPage = true,
  variant = 'default',
  className = ''
}: PaginationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>('down');

  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    if (variant === 'simple') {
      // Simple variant: show all page numbers
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-primary-500 text-white'
              : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {page}
        </button>
      ));
    }

    if (variant === 'compact') {
      // Compact variant: show current ±1, first, last with ellipsis
      const pages: (number | 'ellipsis')[] = [];

      if (totalPages <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Always show first page
        pages.push(1);

        if (currentPage > 3) {
          pages.push('ellipsis');
        }

        // Show pages around current
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
          if (i !== 1 && i !== totalPages) {
            pages.push(i);
          }
        }

        if (currentPage < totalPages - 2) {
          pages.push('ellipsis');
        }

        // Always show last page
        if (totalPages > 1) {
          pages.push(totalPages);
        }
      }

      return pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${index}`} className='px-2 text-gray-600 dark:text-gray-400'>
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {page}
          </button>
        );
      });
    }

    // Default variant: show up to 5 pages with ellipsis
    const maxVisible = 5;
    let startPage: number;
    let endPage: number;

    if (totalPages <= maxVisible) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 3) {
      startPage = 1;
      endPage = maxVisible;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - maxVisible + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    const pages: React.JSX.Element[] = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === i
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {pages}
        {totalPages > maxVisible && endPage < totalPages && (
          <span className='px-2 text-gray-600 dark:text-gray-400'>...</span>
        )}
      </>
    );
  };

  const handleDropdownToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 140; // max height of dropdown

    // Open upward if not enough space below but enough space above
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      setDropdownDirection('up');
    } else {
      setDropdownDirection('down');
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 ${className}`}>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
          aria-label='Previous page'
        >
          ‹
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
          aria-label='Next page'
        >
          ›
        </button>
      </div>

      {showGoToPage && (
        <div className='relative flex items-center gap-2 sm:ml-4'>
          <span className='text-sm text-gray-600 dark:text-gray-400'>Go to page</span>
          <div className='relative'>
            <button
              onClick={handleDropdownToggle}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
              className='px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm w-[60px] sm:w-[65px] md:w-[70px] text-left flex items-center justify-between gap-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              aria-label='Select page'
            >
              <span className='flex-1 text-left text-gray-900 dark:text-white'>{currentPage}</span>
              {(() => {
                let rotationClass = '';

                if (isDropdownOpen) {
                  rotationClass = dropdownDirection === 'up' ? 'rotate-0' : 'rotate-180';
                }

                return (
                  <svg
                    className={`w-4 h-4 flex-shrink-0 text-gray-600 dark:text-gray-400 transition-transform ${rotationClass}`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                );
              })()}
            </button>

            {isDropdownOpen && (
              <div
                className={`absolute left-0 w-[60px] sm:w-[65px] md:w-[70px] bg-white dark:bg-gray-800 
                  border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-[140px] 
                  overflow-y-auto z-50 ${dropdownDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'}`}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      handlePageClick(page);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
