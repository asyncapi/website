import React from 'react';

/* eslint-disable max-len */
/**
 * @description Icons for asyncapi website
 */
type IconChevronDownProps = Readonly<{
  className?: string;
}>;

/**
 * @param {IconChevronDownProps} props - The props for the ChevronDown icon
 * @returns {React.JSX.Element} The ChevronDown icon component
 */
export default function IconChevronDown({ className = '' }: IconChevronDownProps): React.JSX.Element {
  return (
    <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
    </svg>
  );
}
