import React from 'react';

export interface PaginationItemProps {
  // eslint-disable-next-line prettier/prettier

  /** The page number to display */
  pageNumber: number;

  /** Whether this page is currently active */
  isActive: boolean;

  /** Function to handle page change */
  onPageChange: (page: number) => void;
}

/**
 * This is the PaginationItem component. It displays a single page number that can be clicked.
 */
export default function PaginationItem({
  pageNumber,
  isActive,
  onPageChange,
  ...buttonProps
}: PaginationItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={() => onPageChange(pageNumber)}
      className={`font-inter font-normal relative flex size-8 items-center
        justify-center rounded-full text-xs leading-[26px] md:size-10 md:text-sm
        ${isActive ? 'bg-[#6200EE] text-white' : 'bg-transparent text-[#141717] hover:bg-gray-50'}
      `}
      aria-current={isActive ? 'page' : undefined}
      {...buttonProps}
    >
      {pageNumber}
    </button>
  );
}
