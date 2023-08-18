export function sortFilter(arr) {
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

export const applyFilterList = (checks, data, setFilters) => {
  if (Object.keys(checks).length) {
    let lists = {};
    checks.map((check) => {
      lists[check.name] = [];
    });
    for (let i = 0; i < data.length; i++) {
      const res = data[i];
      for (const key in lists) {
        const result = data[i][key];
        if (res) {
          if (lists[key].length) {
            if (Array.isArray(result)) {
              result.map((a) => {
                if (a.name) {
                  if (lists[key].some((e) => e.value === a.name)) {
                    return;
                  } else {
                    const newData = {
                      value: a.name,
                      text: a.name,
                    };
                    lists[key].push(newData);
                    sortFilter(lists[key]);
                  }
                } else {
                  if (lists[key].some((e) => e.value === a)) {
                    return;
                  } else {
                    const newData = {
                      value: a,
                      text: a,
                    };
                    lists[key].push(newData);
                    sortFilter(lists[key]);
                  }
                }
              });
            } else {
              if (lists[key].some((e) => e.value === result)) {
                continue;
              } else {
                const newData = {
                  value: result,
                  text: result,
                };
                lists[key].push(newData);
                sortFilter(lists[key]);
              }
            }
          } else {
            if (Array.isArray(result)) {
              result.map((e) => {
                if (e.name) {
                  const newData = {
                    value: e.name,
                    text: e.name,
                  };
                  lists[key].push(newData);
                } else {
                  const newData = {
                    value: e,
                    text: e,
                  };
                  lists[key].push(newData);
                }
              });
            } else {
                 const newData = {
                   value: result,
                   text: result,
                 };
              lists[key].push(newData);
            }
          }
        }
      }
    }
    setFilters(lists);
  }
};

export const onFilterApply = (data, onFilter, query) => {
  let result = data;
  if (query && Object.keys(query).length >= 1) {
    for (const property in query) {
      const res = result.filter((e) => {
        if (!query[property] || e[property] === query[property]) {
          return e[property];
        }
        if (Array.isArray(e[property])) {
          if (e[property].some((data) => data.name === query[property])) {
            return e[property].some((data) => data.name === query[property]);
          }
          return (
            e[property].some((data) => data.name === query[property]) ||
            e[property].includes(query[property]) ||
            false
          );
        }
        return;
      });
      result = res;
    }
  }
  onFilter(result);
};
