import React from 'react';

/**
 * @description Upward arrow icon for AsyncAPI website
 */
export default function ArrowUp({ className = '' }) {
  return (
    <svg
      className={className || 'inline-block'}
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        d='M10 3a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L11 6.414V17a1 1 0 11-2 0V6.414L6.707 8.707A1 1 0 015.293 7.293l4-4A1 1 0 0110 3z'
        clipRule='evenodd'
      />
    </svg>
  );
}
