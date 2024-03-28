import { twMerge } from 'tailwind-merge';

import type { Category, Language, Technology } from '@/types/components/tools/ToolDataType';

type DataList = Language[] | Technology[] | Category[];

interface FiltersDropdownProps {
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
  const handleClickOption = (event: React.MouseEvent, option: string) => {
    const isChecked = checkedOptions.includes(option);
    const updatedOptions = isChecked ? checkedOptions.filter((item) => item !== option) : [...checkedOptions, option];

    setCheckedOptions(updatedOptions);
  };

  return (
    <div
      className={twMerge(`max-w-lg flex gap-2 flex-wrap p-2 duration-200 delay-150 ${className}`)}
      data-testid='FiltersDropdown-div'
    >
      {dataList.map((data, index) => {
        const checked = checkedOptions.includes(data.name);

        return (
          <div
            key={index}
            className={twMerge(
              `border border-secondary-600 text-secondary-600 p-1 pb-0 rounded-2xl flex gap-1 cursor-pointer items-start ${checked ? 'bg-secondary-600 text-white' : ''}`
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
