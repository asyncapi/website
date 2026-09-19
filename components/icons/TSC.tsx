import React from 'react';

/**
 * @description Icons for asyncapi website
 */
export default function IconTSC({ className = '' }) {
  return (
    <svg
      className={className || 'inline-block'}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='9' />
      <circle cx='12' cy='12' r='2.2' />
      <path d='M12 14.2V21M10.1 10.9L4.2 7.5M13.9 10.9l5.9-3.4' />
    </svg>
  );
}
