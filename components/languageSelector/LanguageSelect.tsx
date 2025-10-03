import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import i18nextConfig from '@/next-i18next.config.cjs';

import type { SelectProps } from '../form/Select';
import IconLanguage from '../icons/Language';

/**
 * @description LanguageSelect component for selecting a language.
 * @param {string} [props.className=''] - Additional classes for styling.
 * @param {Function} [props.onChange=()=>{}] - The callback function invoked when the selection changes.
 * @param {Array} [props.options=[]] - An array of options for the select dropdown.
 * @param {string} props.selected - The currently selected option value.
 */
export default function LanguageSelect({ options = [], selected, onChange = () => {}, className = '' }: SelectProps) {
  const [open, setOpen] = useState(false);
  const { langMap } = i18nextConfig;

  const selectedOption = options.find((o) => o.value === selected);
  const selectedDisplayText =
    selectedOption && (langMap[selectedOption.text.toLowerCase() as keyof typeof langMap] || selectedOption.text)
      ? langMap[selectedOption.text.toLowerCase() as keyof typeof langMap] || selectedOption.text
      : 'Select';

  return (
    <div className='relative inline-block'>
      {/* Trigger button */}
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className={twMerge(
          `flex items-center w-full justify-between rounded-md border border-gray-300 
           bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 
           focus:outline-none ${className}`
        )}
      >
        <span className='flex items-center gap-2'>
          <IconLanguage className='text-gray-600' />
          {selectedDisplayText}
        </span>
        <span className='ml-2 text-gray-500'>▾</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul className='absolute mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg z-10 overflow-hidden'>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className='cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
            >
              {langMap[option.text.toLowerCase() as keyof typeof langMap] || option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
