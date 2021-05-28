import { useState, useEffect } from "react";
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
  filter,
  setFilter,
  checks,
  className,
}) {
  const [values, setValues] = useState({});
  const [filters, setFilters] = useState({});
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    onFilterApply();
  }, [filter]);
  const onFilterApply = () => {
    if (Object.keys(values).length >= 1) {
      const a = data.filter((e) => {
        for (const property in values) {
          if (e[property] === values[property].name) {
            return (e[property] = values[property].name);
          }
          if (Array.isArray(e[property])) {
            if (
              e[property].some(
                (data) =>
                  data[values[property].unique] === values[property].name
              )
            ) {
              return e[property].some(
                (data) =>
                  data[values[property].unique] === values[property].name
              );
            } else if (e[property].includes(values[property].name)) {
              return e[property].includes(values[property].name);
            }
          }
        }
      });
      onFilter(a);
    }
  };
  return checks.map((check) => {
    return (
      <Select
        key={check.name}
        options={filters[check.name]}
        onChange={(e) => {
          setValues({
            ...values,
            [check.name]: {
              name: e,
              unique: check.unique,
            },
          });
          setFilter(Math.random());
        }}
        selected={`Filter by ${check.name}...`}
        className={`${className} w-full my-1`}
      />
    );
  });
}

Filter.propTypes = {
  data: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
};
