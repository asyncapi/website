import { useCallback, useMemo, useState } from 'react';

/**
 * @description Custom hook for managing pagination logic
 * @example const { currentPage, setCurrentPage, currentItems, maxPage } = usePagination(items, 10, { currentPage: 2 });
 * @param {T[]} items - Array of items to paginate
 * @param {number} itemsPerPage - Number of items per page
 * @param {object} [options] - Pagination options
 * @param {number} [options.currentPage] - Optional current page (controlled)
 * @param {(page: number) => void} [options.onPageChange] - Called when setCurrentPage is invoked in controlled mode
 * @returns {object}
 * @returns {number} currentPage - Current page number
 * @returns {function} setCurrentPage - Function to update the current page
 * @returns {T[]} currentItems - Items for the current page
 * @returns {number} maxPage - Total number of pages
 */
export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  options: { currentPage?: number; onPageChange?: (page: number) => void } = {}
) {
  const [internalPage, setInternalPage] = useState(1);
  const { currentPage: controlledPage, onPageChange } = options;
  const isControlled = typeof controlledPage === 'number' && !Number.isNaN(controlledPage);
  const page = isControlled ? (controlledPage as number) : internalPage;
  const maxPage = Math.ceil(items.length / itemsPerPage);
  const safePage = maxPage === 0 ? 1 : Math.min(Math.max(page, 1), maxPage);
  const setCurrentPage = useCallback(
    (nextPage: number) => {
      if (isControlled) {
        onPageChange?.(nextPage);

        return;
      }
      setInternalPage(nextPage);
    },
    [isControlled, onPageChange]
  );

  const currentItems = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;

    return items.slice(start, start + itemsPerPage);
  }, [items, safePage, itemsPerPage]);

  return {
    currentPage: safePage,
    setCurrentPage,
    currentItems,
    maxPage
  };
}
