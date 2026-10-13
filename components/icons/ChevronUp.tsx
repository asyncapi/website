import React from 'react';

/* eslint-disable max-len */
/**
 * @description Icons for asyncapi website
 */
type IconChevronUpProps = Readonly<{
  className?: string;
}>;

/**
 * @param {IconChevronUpProps} props - The props for the ChevronUp icon
 * @returns {React.JSX.Element} The ChevronUp icon component
 */
export default function IconChevronUp({ className = '' }: IconChevronUpProps): React.JSX.Element {
  return (
    <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
    </svg>
  );
}
