import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { applyFilterList, type DataObject, type Filter as FilterQuery, onFilterApply } from '../helpers/applyFilter';
import FilterDropdown from './FilterDropdown';

interface Check {
  name: string;
}

interface FilterProps<T extends DataObject = DataObject> {
  data: T[];
  onFilter: (data: T[], query: FilterQuery) => void;
  checks: Check[];
  className?: string;
}

/**
 * @description Component representing a filter for data.
 * @param {Object} props - The props for the Filter component.
 * @param {Object[]} props.data - The data to be filtered.
 * @param {(data: Object[], query: FilterQuery) => void} props.onFilter - The callback function to handle filtering.
 * @param {Object[]} props.checks - The list of filter options.
 * @param {string} [props.className] - Additional CSS classes for styling.
 */
export default function Filter<T extends DataObject = DataObject>({
  data,
  onFilter,
  checks,
  className
}: FilterProps<T>) {
  const route = useRouter();
  const [filters, setFilters] = useState<Record<string, { value: string; text: string }[]>>({});
  const [routeQuery, setQuery] = useState<Record<string, string>>({});

  useEffect(() => {
    const validKeys = new Set(checks.map((check) => check.name));
    const filteredQuery: Record<string, string> = {};

    Object.entries(route.query).forEach(([key, value]) => {
      if (validKeys.has(key) && typeof value === 'string') {
        filteredQuery[key] = value;
      }
    });

    setQuery(filteredQuery);
    applyFilterList(checks, data, setFilters);
    // route.asPath is used as a proxy for route.query because route.query is an object
    // that Next.js recreates on each render, which would cause infinite re-renders.
    // route.asPath (a string) changes whenever the URL query parameters change,
    // making it a stable and correct dependency for re-reading route.query.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.asPath, checks, data]);

  useEffect(() => {
    onFilterApply(data, onFilter, routeQuery);
  }, [routeQuery, data, onFilter]);

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
      <FilterDropdown
        key={check.name}
        options={selectOptions}
        onChange={(e) => {
          const { query } = route;
          const newQuery = {
            ...query
          };

          delete newQuery.page;

          if (e) {
            newQuery[check.name] = e;
          } else {
            // Remove a specific filter upon clicking Select Placeholder option
            delete newQuery[check.name];
          }

          const queryParams = new URLSearchParams(newQuery as { [key: string]: string }).toString();
          const targetUrl = queryParams ? `${route.pathname}?${queryParams}` : route.pathname;

          route.push(targetUrl, undefined, {
            shallow: true
          });
        }}
        selected={selected}
        className={`${className} md:mr-4`}
      />
    );
  });
}
