function Filter({ data }) {
  return (
    <div class="my-2 flex sm:flex-row flex-col">
      <div class="flex flex-row mb-1 sm:mb-0">
        {data.map((filter) => (
          <div key={filter.values[0]} class="relative">
            <select
              onChange={(e) => {
                filter.listener(e.target.value);
              }}
              class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              {filter.values.map((value) => (
                <option key={value} value={value}>
                  {value || "Unknown"}
                </option>
              ))}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
