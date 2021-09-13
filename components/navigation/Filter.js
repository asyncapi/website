import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Select from "../form/Select";
import { applyFilterList, onFilterApply } from "../helpers/applyFilter";

export default function Filter({ data, onFilter, checks, className }) {
  console.log(data);
  const route = useRouter();
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState({});

  useEffect(() => {
    setQuery(route.query);
    applyFilterList(checks, data, setFilters);
  }, [route]);
  useEffect(() => {
    onFilterApply(data, onFilter, query);
  }, [query]);
  return checks.map((check) => {
    let selected = "";
    if (Object.keys(query).length) {
      if (query[check.name]) {
        selected = `${query[check.name]}`;
      }
    }
    const selectOptions = [
      {
        value: "",
        text: `Filter by ${check.name}...`,
      },
      ...(filters[check.name] || []),
    ];
    return (
      <Select
        key={check.name}
        options={selectOptions}
        onChange={(e) => {
          const { query } = route;
          const newQuery = {
            ...query,
            [check.name]: e,
          };
          if (!e) {
            delete newQuery[check.name];
          }
          const queryParams = new URLSearchParams(newQuery).toString();
          route.push(`${route.pathname}?${queryParams}`, undefined, {
            shallow: true,
          });
        }}
        selected={selected}
        className={`${className} my-1 md:mr-4`}
      />
    );
  });
}

Filter.propTypes = {
  data: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  checks: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
};
