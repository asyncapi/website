import React from 'react';
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
export default function LanguageSelect({ className = '', onChange = () => {}, options = [], selected }: SelectProps) {
  const { langMap } = i18nextConfig;

  return (
    <div className='relative inline-block'>
      <div className='relative flex items-center gap-2'>
        {/* Display Icon Next to the Select Box */}
        <IconLanguage className='pointer-events-none absolute left-3 text-gray-600 dark:text-white' />
        <select
          data-testid='Select-form'
          onChange={(ev) => onChange(ev.target.value)}
          className={twMerge(
            `form-select h-full px-10 pr-7 inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-purple-600 shadow-sm py-2 bg-white dark:bg-dark-purple-800 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-purple-700 focus:border-gray-500 dark:focus:border-dark-purple-500 focus:outline-none focus:ring-0 focus:ring-black ${className}`
          )}
          value={selected}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} data-testid='Option-form'>
              {langMap[option.text.toLowerCase() as keyof typeof langMap] || option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
