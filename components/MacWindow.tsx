import React from 'react';

interface IMacWindowProps {
  className?: string;
  contentClassName?: string;
  title: string;
  children: React.ReactNode;
}

/**
 * @description A component that represents a Mac window
 * @param {string} {props.className} - The class name for the component
 * @param {string} {props.contentClassName} - The class name for the content
 * @param {string} {props.title} - The title of the window
 * @param {React.ReactNode} {props.children} - The children of the window
 */
export default function MacWindow({ className = '', contentClassName = '', title, children }: IMacWindowProps) {
  return (
    <div className={`${className} rounded`} data-testid='MacWindow-main'>
      <div className='flex px-4 py-2 text-left' data-testid='MacWindow-div'>
        <div>
          <span className='mr-2 inline-block size-2.5 rounded-full bg-mac-window-close'></span>
          <span className='mr-2 inline-block size-2.5 rounded-full bg-mac-window-minimize'></span>
          <span className='mr-2 inline-block size-2.5 rounded-full bg-mac-window-maximize'></span>
        </div>
        <div
          className='flex-1 truncate px-2 text-left text-sm text-gray-400 sm:text-center'
          title={title}
          data-testid='MacWindow-title-div'
        >
          {title}
        </div>
        <div className='hidden sm:block' data-testid='MacWindow-title-center'>
          {' '}
          {/* This block is used for aligning the title on the center */}
          <span className='mr-2 inline-block size-2.5'></span>
          <span className='mr-2 inline-block size-2.5'></span>
          <span className='mr-2 inline-block size-2.5'></span>
        </div>
      </div>
      <div className={`${contentClassName} px-4 pb-4`}>{children}</div>
    </div>
  );
}
