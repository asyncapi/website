import { twMerge } from "tailwind-merge";

export default function FiltersDisplay({ checkedValues = [], setValues }) {
  // function to clear selected filters
  const handleClickOption = (e, option, checkedValues, setValues) => {
    let tempValueArray = [...checkedValues];
    let index = checkedValues.indexOf(option);
    if (index > -1) {
      tempValueArray.splice(index, 1);
    }
    setValues(tempValueArray);
  };

  return (
    <>
    {checkedValues.length>0 && 
    <div className="max-w-lg flex gap-2 flex-wrap p-2 duration-200 delay-150">
      {checkedValues.map((items, index) => {
        return (
          <div
            key={index}
            className={twMerge(
                `hover:border-black border border-gray-600 text-gray-600 hover:text-black p-1 pb-0 rounded-2xl flex gap-1 items-start`
            )}
          >
            <div className="text-xs m-auto h-fit">{items}</div>
            <button className="hover:bg-gray-100 p-1 rounded-full -mt-[2px]" onClick={(e) => handleClickOption(e, items, checkedValues, setValues)}>
            <img src="/img/illustrations/icons/close-icon.svg" width="10" /></button>
          </div>
        );
      })}
    </div> }
    </>
  );
}
