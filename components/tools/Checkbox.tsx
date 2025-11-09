import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { CheckboxProps } from '@/types/components/tools/CheckboxPropsType';

/**
 * This component renders a checkbox.
 */
const Checkbox = ({
  name,
  checked,
  bgColor = 'bg-white',
  textColor = 'text-secondary-600',
  borderColor = 'border-secondary-600',
  checkedStateBgColor = 'bg-secondary-600',
  checkedStateTextColor = 'text-white',
  handleClickOption
}: CheckboxProps) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from propagating to parent elements
    handleClickOption(name);
  };

  return (
    <div
      className={twMerge(
        `border ${borderColor} dark:border-secondary-500 ${bgColor} dark:bg-gray-800 ${textColor} dark:text-secondary-400 p-1 pb-0 rounded-2xl flex gap-1 cursor-pointer items-start transition-all duration-200 hover:shadow-md ${checked ? `${checkedStateBgColor} dark:bg-secondary-700 ${checkedStateTextColor} dark:text-white` : ''}`
      )}
      onClick={handleClick}
    >
      {checked ? (
        <img src='/img/illustrations/icons/CheckedIcon.svg' alt='checked' className='dark:invert' />
      ) : (
        <img src='/img/illustrations/icons/UncheckedIcon.svg' alt='unchecked' className='dark:invert dark:opacity-80' />
      )}
      <div className='-mt-px mb-px text-xs'>{name}</div>
    </div>
  );
};

export default Checkbox;
