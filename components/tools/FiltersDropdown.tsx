import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Category, Language, Technology } from '@/types/components/tools/ToolDataType';

type DataList = Language[] | Technology[] | Category[];

export interface FiltersDropdownProps {
  dataList?: DataList;
  checkedOptions?: string[];
  setCheckedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

/**
 * @description This component displays Filter Dropdown Component.
 *
 * @param {DataList} props.dataList - List of filter options.
 * @param {string[]} props.checkedOptions - List of options that are currently checked.
 * @param {React.Dispatch<React.SetStateAction<string[]>>} props.setCheckedOptions - Function to set check state of options.
 * @param {string} props.className - Additional CSS classes for the component.
 */
export default function FiltersDropdown({
  dataList = [],
  checkedOptions = [],
  setCheckedOptions,
  className = ''
}: FiltersDropdownProps) {
  const handleClickOption = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, option: string) => {
    const isChecked = checkedOptions.includes(option);
    const updatedOptions = isChecked ? checkedOptions.filter((item) => item !== option) : [...checkedOptions, option];

    setCheckedOptions(updatedOptions);
  };

  return (
    <div
      className={twMerge(
        `max-w-lg flex flex-col max-h-[20vh] gap-1 overflow-y-auto p-2 px-0 duration-200 delay-150 bg-white text-gray-700 dark:bg-dark-card dark:text-gray-200 ${className}`
      )}
      data-testid='FiltersDropdown-div'
    >
      {dataList.map((data, index) => {
        const checked = checkedOptions.includes(data.name);

        return (
          <button
            key={index}
            type='button'
            className={twMerge(
              `group flex w-full cursor-pointer items-start gap-2 p-2 text-left text-gray-700
              transition-colors hover:bg-gray-100
              dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-gray-900
              ${checked ? 'bg-secondary-100 text-gray-900 dark:!bg-gray-100 dark:!text-gray-900' : ''}`
            )}
            onClick={(event) => handleClickOption(event, data.name)}
          >
            {checked ? (
              <img src='/img/illustrations/icons/CheckedIcon.svg' alt='checked' className='mt-0.5 size-3' />
            ) : (
              <img
                src='/img/illustrations/icons/UncheckedIcon.svg'
                alt='unchecked'
                className='mt-0.5 size-3 dark:invert group-hover:dark:invert-0'
              />
            )}
            <div className='mb-px text-xs'>{data.name}</div>
          </button>
        );
      })}
    </div>
  );
}
