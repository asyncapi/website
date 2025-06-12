import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Select from '../form/Select';
import { applyFilterList, onFilterApply } from '../helpers/applyFilter';

interface Check {
  name: string;
  [key: string]: any;
}

interface FilterProps {
  data: any[];
  onFilter: (data: any[]) => void;
  checks: Check[];
  className?: string;
}

interface MultiSelectProps {
  options: { value: string; text: string }[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder: string;
  className?: string;
}

/**
 * @description Multi-select component that looks like the original Select but supports multiple selections
 */
function MultiSelect({
  options,
  selectedValues,
  onSelectionChange,
  placeholder,
  className
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedValues, value]);
    } else {
      onSelectionChange(selectedValues.filter(v => v !== value));
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length} selected`;
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-left text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">
          {getDisplayText()}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute z-20 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md border border-gray-200 overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
              {options.filter(option => option.value !== '').map((option) => (
                <label
                  key={option.value}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedValues.includes(option.value)}
                    onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                  />
                  <span className="ml-2 text-gray-900">{option.text}</span>
                </label>
              ))}
              {selectedValues.length > 0 && (
                <div className="border-t border-gray-100">
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      onSelectionChange([]);
                      setIsOpen(false);
                    }}
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * @description Component representing a filter for data with multi-select capability.
 * @param {Object} props - The props for the Filter component.
 * @param {Object[]} props.data - The data to be filtered.
 * @param {(data: Object[]) => void} props.onFilter - The callback function to handle filtering.
 * @param {Object[]} props.checks - The list of filter options.
 * @param {string} [props.className] - Additional CSS classes for styling.
 */
export default function Filter({ data, onFilter, checks, className }: FilterProps) {
  const route = useRouter();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [routeQuery, setQuery] = useState<Record<string, any>>({});

  useEffect(() => {
    setQuery(route.query);
    applyFilterList(checks, data, setFilters);
  }, [route]);

  useEffect(() => {
    onFilterApply(data, onFilter, routeQuery);
  }, [routeQuery]);

  const handleMultiSelectChange = (filterName: string, selectedValues: string[]) => {
    const { query } = route;
    const newQuery = { ...query };

    if (selectedValues.length > 0) {
      // Store multiple values as comma-separated string
      newQuery[filterName] = selectedValues.join(',');
    } else {
      // Remove filter if no values selected
      delete newQuery[filterName];
    }

    const queryParams = new URLSearchParams(newQuery as { [key: string]: string }).toString();
    route.push(`${route.pathname}?${queryParams}`, undefined, {
      shallow: true
    });
  };

  return checks.map((check) => {
    // Get currently selected values from URL query
    const currentSelections = routeQuery[check.name]
      ? routeQuery[check.name].split(',').filter(Boolean)
      : [];

    const selectOptions = [
      {
        value: '',
        text: `Filter by ${check.name}...`
      },
      ...(filters[check.name] || [])
    ];

    return (
      <MultiSelect
        key={check.name}
        options={selectOptions}
        selectedValues={currentSelections}
        onSelectionChange={(values) => handleMultiSelectChange(check.name, values)}
        placeholder={`Filter by ${check.name}...`}
        className={`${className} md:mr-4`}
      />
    );
  });
}
