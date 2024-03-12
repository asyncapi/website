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

export const applyFilterList = (checks: { name: string }[],
  data: { [key: string]: any }[],
  setFilters: (lists: { [key: string]: { value: string; text: string }[] }) => void): void => {
  if (Object.keys(checks).length) {
    const lists: { [key: string]: { value: string; text: string }[] } = {};

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
              result.map((a: any) => {
                if (a.name) {
                  if (lists[key].some((e) => e.value === a.name)) {

                  } else {
                    const newData = {
                      value: a.name,
                      text: a.name
                    };

                    lists[key].push(newData);
                    sortFilter(lists[key]);
                  }
                } else if (lists[key].some((e) => e.value === a)) {

                } else {
                  const newData = {
                    value: a,
                    text: a
                  };

                  lists[key].push(newData);
                  sortFilter(lists[key]);
                }
              });
            } else if (lists[key].some((e) => e.value === result)) {
              continue;
            } else {
              const newData = {
                value: result,
                text: result
              };

              lists[key].push(newData);
              sortFilter(lists[key]);
            }
          } else if (Array.isArray(result)) {
            result.map((e: any) => {
              if (e.name) {
                const newData = {
                  value: e.name,
                  text: e.name
                };

                lists[key].push(newData);
              } else {
                const newData = {
                  value: e,
                  text: e
                };

                lists[key].push(newData);
              }
            });
          } else {
            const newData = {
              value: result,
              text: result
            };

            lists[key].push(newData);
          }
        }
      }
    }
    setFilters(lists);
  }
};

export const onFilterApply = (data: { [key: string]: any }[],
  onFilter: (result: { [key: string]: any }[], query: { [key: string]: string }) => void,
  query: { [key: string]: string }): void => {
  let result = data;

  if (query && Object.keys(query).length >= 1) {
    for (const property in query) {
      const res = result.filter((e) => {
        if (!query[property] || e[property] === query[property]) {
          return e[property];
        }
        if (Array.isArray(e[property])) {
          if (e[property].some((data: any) => data.name === query[property])) {
            return e[property].some((data: any) => data.name === query[property]);
          }

          return (
            e[property].some((data: any) => data.name === query[property]) ||
                        e[property].includes(query[property]) ||
                        false
          );
        }
      });

      result = res;
    }
  }
  onFilter(result, query);
};
