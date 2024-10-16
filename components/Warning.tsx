import React from 'react';

import IconExclamation from './icons/Exclamation';

interface WarningProps {
  title: string;
  className?: string;
  description: string;
}

/**
 * This component displays a warning component.
 * @param {WarningProps} props - The props for the warning component
 * @param {string} props.title - The title of the warning component
 * @param {string} props.className - Additional classes for the figure
 * @param {string} props.description - The content of the warning component
 */
export default function Warning({ className = '', title, description }: WarningProps) {
  return (
    <div className={`${className} rounded-md bg-yellow-50 p-4`} data-testid='Warning-main'>
      <div className='flex'>
        <div className='shrink-0'>
          <IconExclamation className='size-5' />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium uppercase leading-5 text-yellow-800' data-testid='Warning-title'>
            {title}
          </h3>
          <div className='mt-2 text-sm leading-5 text-yellow-700' data-testid='Warning-description'>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
