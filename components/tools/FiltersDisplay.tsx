import React, { useCallback, useMemo } from 'react';
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
  const handleClickOption = useCallback(
    (option: string) => {
      const tempValueArray = [...checkedOptions];
      const index = checkedOptions.indexOf(option);

      if (index > -1) {
        tempValueArray.splice(index, 1);
      }
      setCheckedOptions(tempValueArray);
    },
    [checkedOptions, setCheckedOptions]
  );

  const displayItems = useMemo(() => {
    return checkedOptions.map((items, index) => (
      <div
        key={index}
        className={twMerge(
          'hover:border-black border border-gray-600 text-gray-600 hover:text-black p-1 pb-0 rounded-2xl flex gap-1 items-start'
        )}
      >
        <div className='m-auto h-fit text-xs'>{items}</div>
        <button
          className='mt-[-2px] rounded-full p-1 hover:bg-gray-100'
          onClick={() => handleClickOption(items)}
          data-testid='Filters-Display-Button'
        >
          <img src='/img/illustrations/icons/close-icon.svg' alt='close' width='10' />
        </button>
      </div>
    ));
  }, [checkedOptions, handleClickOption]);

  if (!checkedOptions.length) {
    return null;
  }

  return (
    <div className='flex max-w-lg flex-wrap gap-2 p-2 delay-150 duration-200' data-testid='FiltersDisplay-main'>
      {displayItems}
    </div>
  );
}
