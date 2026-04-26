import React, { useState } from 'react';

type PaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  onPageChange: (_page: number) => void;
  showGoToPage?: boolean;
  variant?: 'default' | 'simple' | 'compact';
  className?: string;
}>;

/**
 * @description Returns the active/inactive button class string for a page button.
 */
function getPageButtonClass(isActive: boolean, padding = 'px-4 py-2'): string {
  if (isActive) {
    return `${padding} rounded-lg transition-colors bg-primary-500 text-white`;
  }

  return `${padding} rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800`;
}

/**
 * @description Builds the compact page list with ellipsis markers.
 */
function buildCompactPageList(totalPages: number, currentPage: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (currentPage > 3) {
    pages.push('ellipsis');
  }

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

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

/**
 * @description Computes the visible page range for the default variant.
 */
function getDefaultPageRange(totalPages: number, currentPage: number, maxVisible: number) {
  if (totalPages <= maxVisible) {
    return { startPage: 1, endPage: totalPages };
  }

  if (currentPage <= 3) {
    return { startPage: 1, endPage: maxVisible };
  }

  if (currentPage >= totalPages - 2) {
    return { startPage: totalPages - maxVisible + 1, endPage: totalPages };
  }

  return { startPage: currentPage - 2, endPage: currentPage + 2 };
}

/**
 * @description Returns the CSS rotation class for the dropdown chevron.
 */
function getChevronRotation(isOpen: boolean, direction: 'down' | 'up'): string {
  if (!isOpen) {
    return '';
  }

  return direction === 'up' ? 'rotate-0' : 'rotate-180';
}

/**
 * @description Unified Pagination component with customizable display modes and "Go to page" dropdown
 * @param {PaginationProps} props - The props for the component
 * @param {number} props.currentPage - The current active page number
 * @param {number} props.totalPages - The total number of pages
 * @param {(_page: number) => void} props.onPageChange - Callback function when page changes
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

  const renderSimplePages = () =>
    Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => handlePageClick(page)}
        className={`${getPageButtonClass(currentPage === page)} ${
          currentPage === page
            ? ''
            : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        {page}
      </button>
    ));

  const renderCompactPages = () => {
    const pages = buildCompactPageList(totalPages, currentPage);

    return pages.map((page, index) => {
      if (page === 'ellipsis') {
        const prevPage = pages[index - 1];
        const nextPage = pages[index + 1];

        return (
          <span key={`ellipsis-${prevPage}-${nextPage}`} className='px-2 text-gray-600 dark:text-gray-400'>
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={getPageButtonClass(currentPage === page, 'px-3 py-2')}
        >
          {page}
        </button>
      );
    });
  };

  const renderDefaultPages = () => {
    const maxVisible = 5;
    const { startPage, endPage } = getDefaultPageRange(totalPages, currentPage, maxVisible);

    const pages: React.JSX.Element[] = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageClick(i)} className={getPageButtonClass(currentPage === i)}>
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

  const renderPageNumbers = () => {
    switch (variant) {
      case 'simple':
        return renderSimplePages();
      case 'compact':
        return renderCompactPages();
      default:
        return renderDefaultPages();
    }
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

  const chevronRotation = getChevronRotation(isDropdownOpen, dropdownDirection);

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
              <svg
                className={`w-4 h-4 flex-shrink-0 text-gray-600 dark:text-gray-400 transition-transform ${chevronRotation}`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
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
