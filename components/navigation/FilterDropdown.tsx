import React, { useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useOutsideClick } from '../helpers/use-outside-click';
import ArrowDown from '../icons/ArrowDown';

export interface FilterDropdownOption {
  value: string;
  text: string;
}

type FilterDropdownProps = Readonly<{
  className?: string;
  onChange: (selected: string) => void;
  options: FilterDropdownOption[];
  selected?: string;
}>;

/**
 * @description Single-select dropdown for navigation filters.
 */
export default function FilterDropdown({ className = '', onChange, options, selected = '' }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === selected) || options[0];
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={twMerge(`relative inline-block ${className}`)}>
      <button
        type='button'
        data-testid='FilterDropdown-button'
        aria-controls={isOpen ? listboxId : undefined}
        aria-expanded={isOpen}
        className={twMerge(
          `flex h-full w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-4 py-2
          text-left text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
          focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:border-gray-700 dark:bg-dark-card
          dark:text-gray-300 dark:hover:bg-dark-background dark:focus:ring-offset-dark-background`
        )}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className='truncate'>{selectedOption?.text}</span>
        <ArrowDown className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          data-testid='FilterDropdown-options'
          className='absolute left-0 z-50 mt-1 max-h-72 min-w-full overflow-y-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-dark-card md:min-w-64'
        >
          {options.map((option) => {
            const isSelected = option.value === selected;

            return (
              <button
                key={option.value || option.text}
                type='button'
                data-testid='FilterDropdown-option'
                aria-pressed={isSelected}
                className={twMerge(
                  `block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100
                  dark:text-gray-200 dark:hover:bg-dark-background`,
                  isSelected && 'bg-gray-100 text-gray-900 dark:bg-dark-background dark:text-white'
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
