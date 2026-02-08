import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

/**
 * @description Pagination component to navigate through pages of content.
 * @param {number} currentPage - The current active page number (1-based).
 * @param {number} totalPages - The total number of pages.
 * @param {function} onPageChange - Callback function when a page is selected.
 * @param {string} className - Optional CSS class for the container.
 */
export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always include first, last, and pages around current
            const leftSide = Math.max(2, currentPage - 1);
            const rightSide = Math.min(totalPages - 1, currentPage + 1);

            pageNumbers.push(1);
            if (leftSide > 2) pageNumbers.push('...');

            for (let i = leftSide; i <= rightSide; i++) {
                pageNumbers.push(i);
            }

            if (rightSide < totalPages - 1) pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
        return pageNumbers;
    };

    return (
        <div className={`flex justify-center items-center space-x-2 mt-8 ${className}`}>
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border transition-colors duration-200 ${currentPage === 1
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                aria-label="Previous Page"
            >
                Previous
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === '...'}
                    className={`px-3 py-1 rounded-md border transition-colors duration-200 ${page === currentPage
                            ? 'bg-primary-500 text-white border-primary-500'
                            : page === '...'
                                ? 'text-gray-500 border-transparent cursor-default'
                                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                    aria-current={page === currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border transition-colors duration-200 ${currentPage === totalPages
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                aria-label="Next Page"
            >
                Next
            </button>
        </div>
    );
}
