import React from 'react';


/**
 * @description Email icon for AsyncAPI website.
 */
export default function IconEmail({ className = '' }) {
  return (
    <svg
      className={className}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24px'
      height='24px'
    >
      <path d='M 2 4 C 0.90625 4 0 4.90625 0 6 L 0 18 C 0 19.09375 0.90625 20 2 20 L 22 20 C 23.09375 20 24 19.09375 24 18 L 24 6 C 24 4.90625 23.09375 4 22 4 Z M 2 6 L 22 6 L 12 13 Z M 2 8.4375 L 9.40625 13.75 L 2 18 Z M 22 8.4375 L 22 18 L 14.59375 13.75 Z M 10.59375 15.25 L 12 16.25 L 13.40625 15.25 L 22 20 L 2 20 Z' />
    </svg>
  );
}
