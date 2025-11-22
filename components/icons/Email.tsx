import React from 'react';

/* eslint-disable max-len */
/**
 * @description Simple envelope icon
 */
export default function IconEmail({ className = '' }) {
  return (
    <svg className={className} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='currentColor'>
      <path d='M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2zm0 2v.01L12 13l8-5.99V7H4zm16 10V9l-8 6-8-6v8h16z' />
    </svg>
  );
}
