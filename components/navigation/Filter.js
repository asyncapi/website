import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "../form/Select";

export default function Filter({ data, onFilter, filter, type, checks }) {
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
  },[filter])
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
  return (
    <div className="w-full">
      {checks.map((check) => {
        return (
          <div key={check.name}>
            <Select
              options={filters[check.name]}
              onChange={(e) => {
                setValues({
                  ...values,
                  [check.name]: {
                    name: e,
                    unique: check.unique,
                  },
                });
              }}
              selected={`Select ${check.name}...`}
              className="w-full my-1"
            />
          </div>
        );
      })}
    </div>
  );
}

Filter.propTypes = {
  data: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
};
