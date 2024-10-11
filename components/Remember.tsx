import React from 'react';

import LightBulb from './icons/LightBulb';

interface RememberProps {
  title?: string;
  className?: string;
  children: string;
}

/**
 * This component displays a remember component.
 * @param {RememberProps} props - The props for the Remember component
 * @param {string} props.title - The title of the remember component
 * @param {string} props.className - Additional classes for the figure
 * @param {string} props.children - The content of the remember component
 */
export default function Remember({ title = 'Remember', className = '', children }: RememberProps) {
  return (
    <div className={`${className} mb-8 mt-4 rounded bg-secondary-100 p-4 text-gray-900`} data-testid='Remember-main'>
      <h5 className='mb-4 border-b border-gray-900 pb-2 text-lg' data-testid='Remember-heading'>
        <LightBulb className='-mt-0.5 mr-2 inline-block h-8' />
        <span className='ml-2 inline-block font-sans font-medium antialiased' data-testid='Remember-title'>
          {title}
        </span>
      </h5>
      <div>{children}</div>
    </div>
  );
}
