export interface DataObject {
  name?: string;
  [key: string]: unknown;
}

interface FilterCriteria {
  name: string;
}

export interface Filter {
  [key: string]: string;
}

interface FilterOption {
  value: string;
  text: string;
}

/**
 * @description Sorts an array of objects based on a string property called 'value'.
 * @param {{ value: string }[]} arr - Array of objects with a 'value' property of type string.
 */
export function sortFilter(arr: { value: string }[]): { value: string }[] {
  return arr.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
}

/**
 * @description Apply filters to data and update the filters.
 * @param {FilterCriteria[]} checks - Array of filter criteria objects.
 * @param {T[]} data - Array of data objects to filter.
 * @param {(lists: { [key: string]: FilterOption[] }) => void} setFilters - Function to update the filters.
 */
export const applyFilterList = <T extends DataObject>(
  checks: FilterCriteria[],
  data: T[],
  setFilters: (lists: { [key: string]: FilterOption[] }) => void
): void => {
  if (Object.keys(checks).length) {
    const lists: { [key: string]: FilterOption[] } = {};

    checks.forEach((check) => {
      lists[check.name] = [];
    });
    for (let i = 0; i < data.length; i++) {
      const res = data[i];

      Object.keys(lists).forEach((key) => {
        const result = data[i][key];

        if (res) {
          if (lists[key].length) {
            if (Array.isArray(result)) {
              result.forEach((a) => {
                if (typeof a === 'object' && a !== null && 'name' in a) {
                  if (!lists[key].some((e) => e.value === a.name)) {
                    const newData = {
                      value: a.name,
                      text: a.name
                    };

                    lists[key].push(newData);
                    sortFilter(lists[key]);
                  }
                } else if (typeof a === 'string' && !lists[key].some((e) => e.value === a)) {
                  const newData = {
                    value: a,
                    text: a
                  };

                  lists[key].push(newData);
                  sortFilter(lists[key]);
                }
              });
            } else if (typeof result === 'string' && !lists[key].some((e) => e.value === result)) {
              const newData = {
                value: result,
                text: result
              };

              lists[key].push(newData);
              sortFilter(lists[key]);
            }
          } else if (Array.isArray(result)) {
            result.forEach((e) => {
              if (typeof e === 'object' && e !== null && 'name' in e) {
                const newData = {
                  value: e.name,
                  text: e.name
                };

                lists[key].push(newData);
              } else if (typeof e === 'string') {
                const newData = {
                  value: e,
                  text: e
                };

                lists[key].push(newData);
              }
            });
          } else if (typeof result === 'string') {
            const newData = {
              value: result,
              text: result
            };

            lists[key].push(newData);
          }
        }
      });
    }
    setFilters(lists);
  }
};

/**
 * @description Apply filters to data and trigger the filter action.
 * @param {T[]} inputData - Array of data objects to filter.
 * @param {(result: T[], query: Filter) => void} onFilter - Function to apply the filter action.
 * @param {Filter} query - Filter criteria.
 */
export const onFilterApply = <T extends DataObject>(
  inputData: T[],
  onFilter: (result: T[], query: Filter) => void,
  query: Filter
): void => {
  let result = inputData;

  if (query && Object.keys(query).length >= 1) {
    Object.keys(query).forEach((property) => {
      if (property === 'page') {
        return;
      }
      const res = result.filter((e) => {
        if (!query[property] || e[property] === query[property]) {
          return e[property];
        }
        if (Array.isArray(e[property])) {
          const propertyValue = e[property];

          return (
            propertyValue.some((data) =>
              typeof data === 'object' && data !== null && 'name' in data ? data.name === query[property] : false
            ) ||
            propertyValue.includes(query[property]) ||
            false
          );
        }

        return false; // Fixing missing return value issue
      });

      result = res;
    });
  }
  onFilter(result, query);
};
