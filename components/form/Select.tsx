import type { ChangeEvent } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface Option {
  value: string;
  text: string;
}

export interface SelectProps {
  className?: string;
  onChange?: (selected: string) => void;
  options: Option[];
  selected?: string;
}

/**
 * @description Select component for form dropdown.
 * @param {string} [props.className=''] - Additional CSS classes for the select element.
 * @param {(value: string) => void} [props.onChange=() => {}] - Function to handle onChange event.
 * @param {Option[]} props.options - Array of options for the select dropdown.
 * @param {string} props.selected - Value of the currently selected option.
 */
export default function Select({ className = '', onChange = () => {}, options, selected }: SelectProps) {
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      data-testid='Select-form'
      onChange={handleOnChange}
      className={twMerge(
        `form-select h-full pl-2 pr-8 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${className}`
      )}
      value={selected}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value} data-testid='Option-form'>
          {option.text}
        </option>
      ))}
    </select>
  );
}
