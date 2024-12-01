import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { SelectProps } from '../form/Select';

/**
 * @description LanguageSelect component for selecting a language.
 * @param {string} [props.className=''] - Additional classes for styling.
 * @param {Function} [props.onChange=()=>{}] - The callback function invoked when the selection changes.
 * @param {Array} [props.options=[]] - An array of options for the select dropdown.
 * @param {string} props.selected - The currently selected option value.
 */
export default function LanguageSelect({ className = '', onChange = () => {}, options = [], selected }: SelectProps) {
  return (
    <select
      data-testid='Select-form'
      onChange={(ev) => onChange(ev.target.value)}
      className={twMerge(
        `form-select h-full py-0 px-3 pr-7 inline-flex justify-center rounded-md border border-gray-300 shadow-sm py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-gray-500 focus:outline-none focus:ring-0 focus:ring-black ${className}`
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
