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
  label?: string;
  id?: string;
  ariaLabel?: string;
}

/**
 * @description Select component for form dropdown.
 * @param {string} [props.className=''] - Additional CSS classes for the select element.
 * @param {(value: string) => void} [props.onChange=() => {}] - Function to handle onChange event.
 * @param {Option[]} props.options - Array of options for the select dropdown.
 * @param {string} props.selected - Value of the currently selected option.
 * @param {string} [props.label] - Label text for the select element.
 * @param {string} [props.id] - ID for the select element (auto-generated if not provided).
 * @param {string} [props.ariaLabel] - ARIA label for accessibility (falls back to label if not provided).
 */
export default function Select({
  className = '',
  onChange = () => { },
  options,
  selected,
  label,
  id,
  ariaLabel
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  const labelId = `${selectId}-label`;
  const ariaLabelValue = ariaLabel || label;

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='flex flex-col'>
      {label && (
        <label
          htmlFor={selectId}
          id={labelId}
          className='mb-1 text-sm font-medium text-gray-700 sr-only'
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        data-testid='Select-form'
        onChange={handleOnChange}
        className={twMerge(
          `form-select h-full pl-2 pr-8 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${className}`
        )}
        value={selected}
        aria-label={ariaLabelValue}
        aria-labelledby={label ? labelId : undefined}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value} data-testid='Option-form'>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
