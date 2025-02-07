import React from 'react';

export interface AccordionItemProps {
  // eslint-disable-next-line prettier/prettier

  /** Index of the accordion item. */
  itemIndex: number;

  /** Title of the accordion item. */
  title: string;

  /** Content of the accordion item. */
  content: React.ReactNode;

  /** Whether the accordion item is active(open) or not. */
  isActive: boolean;

  /** Function to set the active index of the accordion item. */
  setActiveIndex: (index: number | null) => void;
}

/**
 * This is the AccordionItem component. It displays a single item that can be expanded or collapsed.
 */
export default function AccordionItem({ itemIndex, title, content, isActive, setActiveIndex }: AccordionItemProps) {
  const handleClick = () => {
    const nextIndex = isActive ? null : itemIndex;

    setActiveIndex(nextIndex);
  };

  return (
    <div className='my-2 flex size-full flex-col gap-1 border border-gray-200 bg-white px-2'>
      <button className='flex h-8 w-full items-center justify-between rounded-sm py-2' onClick={handleClick}>
        <div className='font-body font-semibold text-gray-800 antialiased'>{title}</div>
        <div>
          {isActive ? (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M18 15C18 15 13.5811 9.00001 12 9C10.4188 8.99999 6 15 6 15'
                stroke='#556061'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          ) : (
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9'
                stroke='#556061'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          )}
        </div>
      </button>
      {isActive && (
        <div className='rounded-sm border-t border-gray-200 py-2 font-body font-regular text-gray-700 antialiased'>
          {content}
        </div>
      )}
    </div>
  );
}
