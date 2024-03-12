import type { ChangeEvent } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { SelectProps } from '@/types/form/Select';

export default function Select({
  className = '',
  onChange = () => {},
  options,
  selected
}: SelectProps) {
  const handleOnChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    onChange(ev.target.value);
  };

  return (
    <select
      data-testid='Select-form'
      onChange={handleOnChange}
      className={twMerge(`form-select h-full py-0 pl-2 pr-8 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${className}`)}
      value={selected}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value} data-testid='Option-form'>
          {option.text}
        </option>
      ))}
    </select>
  );
};
