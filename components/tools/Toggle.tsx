import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { ToggleProps } from '@/types/components/tools/TogglePropsType';

/**
 * Toggle component for displaying and controlling a toggle switch.
 */
const Toggle = ({
  checked,
  setChecked,
  label,
  bgColor = 'bg-gray-200',
  checkedStateBgColor = 'bg-secondary-500'
}: ToggleProps) => {
  return (
    <label className='relative inline-flex cursor-pointer items-center'>
      <input
        type='checkbox'
        value={checked ? 'true' : 'false'}
        className='peer sr-only'
        onChange={() => setChecked(!checked)}
      />
      <div
        className={twMerge(
          `h-6 w-11 rounded-full transition-colors peer peer-focus:outline-none peer-focus:ring-2
          peer-focus:ring-secondary-500/40 dark:bg-dark-background dark:ring-1 dark:ring-gray-600
          after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border
          after:border-gray-300 after:bg-white after:transition-all after:content-[''] dark:after:border-gray-500
          dark:after:bg-gray-200`,
          bgColor,
          checked &&
            `after:translate-x-full after:border-white ${checkedStateBgColor} dark:bg-secondary-600 dark:ring-secondary-400/60`
        )}
      ></div>
      {label && <div className='ml-2 text-sm font-medium text-gray-700 dark:text-gray-300'>{label}</div>}
    </label>
  );
};

export default Toggle;
