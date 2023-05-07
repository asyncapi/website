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
    <div className={twMerge(` border w-full max-h-[6rem] z-10 text-gray-00 text-bold cursor-pointer ${className}`)}>
      {dataList.map((data, index) => {
        let checked = checkedOptions.indexOf(data.name)!=-1 ? true : false
        return (
          <div key={index} className={twMerge(`p-1 pb-0 flex gap-1 cursor-pointer items-start ${checked ? 'bg-gray-100' : ''}`)} onClick={(e) => handleClickOption(e, data.name)}>
            
            <div className='text-sm font-200 -mt-[1px] mb-[1px]'>{data.name}</div>
        </div>
        )})}
    </div>
  )
}
