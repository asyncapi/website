import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { FilterProps, Option } from '@/types/navigation/Filter';

import Select from '../form/Select';
import { applyFilterList, onFilterApply } from '../helpers/applyFilter';

/**
 * @description Component representing a filter for data.
 * @param {FilterProps} props - The props for the Filter component.
 */
export default function Filter({ data, onFilter, checks, className }: FilterProps): JSX.Element {
  const router: NextRouter = useRouter();
  const [filters, setFilters] = useState<{ [key: string]: Option[] }>({});
  const [query, setQuery] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setQuery(router.query as { [key: string]: string });
    applyFilterList(checks, data, setFilters);
  }, [router]);

  useEffect(() => {
    onFilterApply(data, onFilter, query);
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
