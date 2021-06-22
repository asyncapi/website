import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import PropTypes from "prop-types";
import Select from "../form/Select";

function sortFilter(arr) {
  arr.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  });
}

export default function Filter({
  data,
  onFilter,
  checks,
  className,
}) {
  const route = useRouter();
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState({});

  useEffect(() => {
    setQuery(route.query);
    if (Object.keys(checks).length) {
      let lists = {};
      checks.map((check) => {
        lists[check.name] = [];
      });
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < checks.length; j++) {
          const name = checks[j].name;
          const result = data[i][name];
          if (data[i][name]) {
            if (Object.keys(lists[name])) {
              if (Array.isArray(result)) {
                result.map((i) => {
                  if (checks[j].unique) {
                    if (
                      lists[name].some(
                        (person) => person.value === i[checks[j].unique]
                      )
                    ) {
                      return;
                    } else {
                      const newData = {
                        value: i[checks[j].unique],
                        text: i[checks[j].unique],
                      };
                      lists[name].push(newData);
                      sortFilter(lists[name]);
                    }
                  } else {
                    if (lists[name].some((data) => data.value === i)) {
                      return;
                    }
                    const newData = {
                      value: i,
                      text: i,
                    };
                    lists[name].push(newData);
                    sortFilter(lists[name]);
                  }
                });
              } else {
                if (lists[name].some((data) => data.value === result)) {
                  break;
                } else {
                  const newData = {
                    value: result,
                    text: result,
                  };
                  lists[name].push(newData);
                  sortFilter(lists[name]);
                }
              }
            }
          }
        }
      }
      setFilters(lists);
    }
  }, [route]);
  useEffect(() => {
    onFilterApply();
  }, [query]);
  const onFilterApply = () => {
    let result = data;
    if (query && Object.keys(query).length >= 1) {
      for (const property in query) {
      const res = result.filter((e) => {
        if (e[property] === query[property]) {
          return (e[property] = query[property]);
        }
        if (Array.isArray(e[property])) {
          if (e[property].some((data) => data.name === query[property])) {
            return e[property].some((data) => data.name === query[property]);
          } else if (e[property].includes(query[property])) {
            return e[property].includes(query[property]);
          }
        }
        return;
      });
        result = res;
      }
    }
    onFilter(result)
  };
  return checks.map((check) => {
    let selected = `Filter by ${check.name}...`;
    if (Object.keys(query).length) {
      if (query[check.name]) {
        selected = `${query[check.name]}`;
      }
    }
      return (
        <Select
          key={check.name}
          options={filters[check.name]}
          onChange={(e) => {
            const newQuery = route.query;
            route.push({
              query: {
                ...newQuery,
                [check.name]: e,
              },
            });
          }}
          selected={selected}
          className={`${className} w-full my-1`}
        />
      );
  });
}

Filter.propTypes = {
  data: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
};
