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
  const handleClickOption = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, option: string) => {
    const isChecked = checkedOptions.includes(option);
    const updatedOptions = isChecked ? checkedOptions.filter((item) => item !== option) : [...checkedOptions, option];

    setCheckedOptions(updatedOptions);
  };

  return (
    <div
      className={twMerge(
        `max-w-lg flex flex-col max-h-[20vh] gap-1 overflow-y-auto p-2 px-0 duration-200 delay-150 bg-gray-200 ${className}`
      )}
      data-testid='FiltersDropdown-div'
    >
      {dataList.map((data, index) => {
        const checked = checkedOptions.includes(data.name);

        return (
          <div
            key={index}
            className={twMerge(
              `hover:bg-gray-300 text-black p-1 py-2 gap-1 flex cursor-pointer items-start ${checked ? 'bg-gray-400' : ''}`
            )}
            onClick={(event) => handleClickOption(event, data.name)}
          >
            {checked ? (
              <img src='/img/illustrations/icons/CheckedIcon.svg' alt='checked' />
            ) : (
              <img src='/img/illustrations/icons/UncheckedIcon.svg' alt='unchecked' />
            )}
            <div className='-mt-px mb-px text-xs'>{data.name}</div>
          </div>
        );
      })}
    </div>
  );
}
