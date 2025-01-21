import { useMemo, useState } from 'react';

/**
 * @description Custom hook for managing pagination logic
 * @example const { currentPage, setCurrentPage, currentItems, maxPage } = usePagination(items, 10);
 * @param {T[]} items - Array of items to paginate
 * @param {number} itemsPerPage - Number of items per page
 * @returns {object}
 * @returns {number} currentPage - Current page number
 * @returns {function} setCurrentPage - Function to update the current page
 * @returns {T[]} currentItems - Items for the current page
 * @returns {number} maxPage - Total number of pages
 */
export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    maxPage
  };
}
