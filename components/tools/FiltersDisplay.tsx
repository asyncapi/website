import React from 'react';
import { twMerge } from 'tailwind-merge';

interface FiltersDisplayProps {
  checkedOptions?: string[];
  setCheckedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * @description This component displays Filters.
 *
 * @param {string[]} props.checkedOptions - List of options that are currently checked.
 * @param {React.Dispatch<React.SetStateAction<string[]>>} props.setCheckedOptions - Function to set check state of options.
 */
export default function FiltersDisplay({ checkedOptions = [], setCheckedOptions }: FiltersDisplayProps) {
  // function to clear selected filters
  const handleClickOption = (
    event: React.MouseEvent,
    option: string,
    checkedOptionsList: typeof checkedOptions,
    setCheckedOptionsList: typeof setCheckedOptions
  ) => {
    const tempValueArray = [...checkedOptionsList];
    const index = checkedOptionsList.indexOf(option);

    if (index > -1) {
      tempValueArray.splice(index, 1);
    }
    setCheckedOptionsList(tempValueArray);
  };

  return (
    <div>
      {checkedOptions.length > 0 && (
        <div className='flex max-w-lg flex-wrap gap-2 p-2 delay-150 duration-200' data-testid='FiltersDisplay-main'>
          {checkedOptions.map((items, index) => {
            return (
              <div
                key={index}
                className={twMerge(
                  'flex items-start gap-1 rounded-2xl border border-gray-400 bg-white px-2 py-1 text-gray-700 transition-colors duration-200 hover:border-gray-700 hover:text-gray-900 dark:border-gray-600 dark:bg-dark-background dark:text-gray-300 dark:hover:border-secondary-400 dark:hover:text-white'
                )}
              >
                <div className='m-auto h-fit text-xs'>{items}</div>
                <button
                  className='rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  onClick={(event) => handleClickOption(event, items, checkedOptions, setCheckedOptions)}
                  data-testid='Filters-Display-Button'
                >
                  <img src='/img/illustrations/icons/close-icon.svg' alt='close' width='10' className='dark:invert' />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
