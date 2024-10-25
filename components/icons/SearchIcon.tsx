import React from 'react';

/**
 * @description Icon for search button
 * @param {string} props.className - The class name for styling the icon.
 */
export default function SearchIcon({ className = '' }) {
  return (
    <svg
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`flex-none text-slate-300 dark:text-slate-400 ${className}`}
      aria-hidden='true'
    >
      <path d='m19 19-3.5-3.5' />
      <circle cx='11' cy='11' r='6' />
    </svg>
  );
}
