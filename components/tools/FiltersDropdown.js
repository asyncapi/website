import { twMerge } from "tailwind-merge";

export default function FiltersDropdown({ dataList = [], checkedOptions = [], setStateFunction, className = '' }) {

  const handleClickOption = (e, option) => {
    const isChecked = checkedOptions.includes(option);
    const updatedOptions = isChecked
      ? checkedOptions.filter(item => item !== option)
      : [...checkedOptions, option];

    setStateFunction(updatedOptions);
  };

  return (
    <div className={twMerge(`max-w-lg max-h-[300px] overflow-y-auto border-4 flex gap-2 flex-col p-2 duration-200 delay-150 ${className}`)} data-testid="FiltersDropdown-div">
      {dataList.map((data, index) => {
        const checked = checkedOptions.includes(data.name);
        return (
          <div
            key={index}
            className={twMerge(`border rounded text-gray-700 hover:bg-gray-300 p-1 flex gap-1 cursor-pointer items-start ${checked ? 'hover:bg-secondary-600 bg-secondary-600 text-white' : ''}`)}
            onClick={(e) => handleClickOption(e, data.name)}
            
          >
              <li className="list-none mx-2 ">{data.name}</li>  
          
          </div>
        );
      })}
    </div>
  );
}
