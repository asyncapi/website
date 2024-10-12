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
          `w-11 h-6 ${bgColor} peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${checked ? `after:translate-x-full after:border-white ${checkedStateBgColor}` : ''}`
        )}
      ></div>
      {label && <div className='ml-2 text-sm font-medium'>{label}</div>}
    </label>
  );
};

export default Toggle;
