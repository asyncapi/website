import { twMerge } from "tailwind-merge";

export default function FiltersDropdown({dataList=[], checkedOptions=[], setStateFunction, className=''}) {

  const handleClickOption = (e, option) => {
    let tempValueArray = [...checkedOptions]
    let index = checkedOptions.indexOf(option)
    if(index>-1){
      tempValueArray.splice(index, 1);
    }else{
      tempValueArray.push(option);
    }
    setStateFunction(tempValueArray)
  }
  return (
    <div className={twMerge(` border w-full max-h-[8rem] z-100 text-gray-00 text-md cursor-pointer ${className}`)}>
      {dataList.map((data, index) => {
        let checked = checkedOptions.indexOf(data.name)!=-1 ? true : false
        return (
          <div key={index} className={twMerge(`p-1 pb-0 flex gap-1 cursor-pointer items-start ${checked ? 'bg-gray-200' : ''}`)} onClick={(e) => handleClickOption(e, data.name)}>
            
            <div className='text-md px-2 py-0.5 font-600 -mt-[1px] mb-[1px]'>{data.name}</div>
        </div>
        )})}
    </div>
  )
}
