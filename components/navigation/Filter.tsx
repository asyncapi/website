import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Select from '../form/Select';
import { applyFilterList, onFilterApply } from '../helpers/applyFilter';

export interface Option {
  value: string;
  text: string;
}

export interface FilterProps {
  data: any[];
  onFilter: (data: any[]) => void;
  checks: { name: string; options?: Option[] }[];
  className: string;
}

/**
 * @description Component representing a filter for data.
 * @param {Object} props - The props for the Filter component.
 * @param {Object[]} props.data - The data to be filtered.
 * @param {(data: Object[]) => void} props.onFilter - The callback function to handle filtering.
 * @param {Object[]} props.checks - The list of filter options.
 * @param {string} [props.className] - Additional CSS classes for styling.
 */
export default function Filter({ data, onFilter, checks, className }: FilterProps) {
  const router: NextRouter = useRouter();
  const [filters, setFilters] = useState<{ [key: string]: Option[] }>({});
  const [query, setQuery] = useState<{ [key: string]: string }>({});

  // Set initial query and filter options when router changes
  useEffect(() => {
    setQuery(router.query as { [key: string]: string });
    applyFilterList(checks, data, setFilters);
  }, [router]);

  // Apply filter when query or data changes
  useEffect(() => {
    const filterWithValue = { value: JSON.stringify(query), ...query };

    onFilterApply(data, onFilter, filterWithValue);
  }, [query, data, onFilter]);

  return (
    <>
      {checks.map((check) => {
        let selected = '';

        if (Object.keys(query).length) {
          if (query[check.name]) {
            selected = `${query[check.name]}`;
          }
        }

        const selectOptions: Option[] = [
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
              const { query: currentQuery } = router;
              const newQuery = {
                ...currentQuery,
                [check.name]: e
              };

              if (!e) {
                delete newQuery[check.name];
              }

              const queryParams = new URLSearchParams(newQuery as { [key: string]: string }).toString();

              router.push(`${router.pathname}?${queryParams}`,
                undefined,
                {
                  shallow: true
                });
            }}
            selected={selected}
            className={`${className} md:mr-4`}
          />
        );
      })}
    </>
  );
}
