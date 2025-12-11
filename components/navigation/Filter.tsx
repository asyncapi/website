import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Select from '../form/Select';
import { applyFilterList, onFilterApply } from '../helpers/applyFilter';

interface Check {
  name: string;
}

interface FilterProps<T = any> {
  data: T[];
  onFilter: (data: T[]) => void;
  checks: Check[];
  className?: string;
}

/**
 * @description Component representing a filter for data.
 * @param {Object} props - The props for the Filter component.
 * @param {Object[]} props.data - The data to be filtered.
 * @param {(data: Object[]) => void} props.onFilter - The callback function to handle filtering.
 * @param {Object[]} props.checks - The list of filter options.
 * @param {string} [props.className] - Additional CSS classes for styling.
 */
export default function Filter<T = any>({ data, onFilter, checks, className }: FilterProps<T>) {
  const route = useRouter();
  const [filters, setFilters] = useState<Record<string, { value: string; text: string }[]>>({});
  const [routeQuery, setQuery] = useState<Record<string, string>>({});

  useEffect(() => {
    setQuery(route.query as Record<string, string>);
    applyFilterList(checks, data as any, setFilters);
  }, [route]);

  useEffect(() => {
    onFilterApply(data as any, onFilter as any, routeQuery);
  }, [routeQuery]);

  return checks.map((check) => {
    let selected = '';

    if (Object.keys(routeQuery).length) {
      if (routeQuery[check.name]) {
        selected = `${routeQuery[check.name]}`;
      }
    }
    const selectOptions = [
      {
        value: '',
        text: `Filter by ${check.name}...`
      },
      ...(filters[check.name] || [])
    ];

    return (
      <Select
        key={check.name}
        options={selectOptions}
        onChange={(e) => {
          const { query } = route;
          const newQuery = {
            ...query
          };

          if (e) {
            newQuery[check.name] = e;
          } else {
            // Remove a specific filter upon clicking Select Placeholder option
            delete newQuery[check.name];
          }
          if (newQuery) {
            const queryParams = new URLSearchParams(newQuery as { [key: string]: string }).toString();

            route.push(`${route.pathname}?${queryParams}`, undefined, {
              shallow: true
            });
          }
        }}
        selected={selected}
        className={`${className} md:mr-4`}
      />
    );
  });
}
