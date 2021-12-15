function Filter({ data }) {
  return (
    <div className="flex w-full gap-1">
      {data.map((filter) => (
        <select
          key={filter.values[0]}
          onChange={(e) => {
            filter.listener(e.target.value);
          }}
          className="form-select pl-2 pr-8 rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 mx-px md:mt-0 md: md:text-sm my-1 w-1/3"
        >
          {filter.values.map((value) => (
            <option key={value} value={value}>
              {value || 'Unknown'}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

export default Filter;
