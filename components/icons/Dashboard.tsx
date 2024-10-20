import React from 'react';

/* eslint-disable max-len */
/**
 * @description Icons for asyncapi website
 */
export default function IconDashboard({ className = '' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24px'
      height='24px'
      viewBox='0 0 24 24'
      role='img'
      aria-labelledby='dashboardIconTitle'
      stroke='#000000'
      stroke-width='1'
      stroke-linecap='square'
      stroke-line-join='miter'
      fill='none'
      color='#000000'
      className={className}
    >
      {' '}
      <title id='dashboardIconTitle'>Dashboard</title> <rect width='20' height='20' x='2' y='2' />{' '}
      <path d='M11 7L17 7M11 12L17 12M11 17L17 17' /> <line x1='7' y1='7' x2='7' y2='7' />{' '}
      <line x1='7' y1='12' x2='7' y2='12' /> <line x1='7' y1='17' x2='7' y2='17' />{' '}
    </svg>
  );
}
