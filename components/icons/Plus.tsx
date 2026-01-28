import React from 'react';

/**
 * @description Icon component for Plus
 */
interface IconProps {
  className?: string;
}

/**
 * @param {IconProps} props - The props for the Plus icon
 * @returns {React.JSX.Element} The Plus icon component
 */
export default function IconPlus({ className = '' }: IconProps): React.JSX.Element {
  return (
    <svg className={className} fill='none' viewBox='0 0 24 24' stroke='currentColor' xmlns='http://www.w3.org/2000/svg'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
    </svg>
  );
}
