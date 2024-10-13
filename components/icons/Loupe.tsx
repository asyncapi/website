import React from 'react';

/* eslint-disable max-len */
/**
 * @description Icons for asyncapi website
 */
export default function IconLoupe({ className = '' }) {
  return (
    <svg
      width='24'
      height='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`${className} flex-none`}
      aria-hidden='true'
    >
      <path d='m19 19-3.5-3.5' />
      <circle cx='11' cy='11' r='6' />
    </svg>
  );
}
