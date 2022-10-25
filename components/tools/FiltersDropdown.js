import { twMerge } from "tailwind-merge";

export default function FiltersDropdown({dataList=[], checkedOptions=[], setStateFunction}) {

  const handleClickOption = (data) => {
    let tempValueArray = [...checkedOptions]
    let index = checkedOptions.indexOf(data)
    if(index>-1){
      tempValueArray.splice(index, 1);
    }else{
      tempValueArray.push(data);
    }
    setStateFunction(tempValueArray)
  }
  return (
    <div className='max-w-lg flex gap-2 flex-wrap p-2'>
      {dataList.map((data, index) => {
        let checked = checkedOptions.indexOf(data.name)!=-1 ? true : false
        return (
          <div key={index} className={twMerge(`border border-secondary-600 text-secondary-600 p-1 pb-0 rounded-2xl flex gap-1 cursor-pointer items-start ${checked ? 'bg-secondary-600 text-white' : ''}`)} onClick={() => handleClickOption(data.name)}>
            {checked ? <img src='/img/illustrations/icons/CheckedIcon.svg' /> : <img src='/img/illustrations/icons/UncheckedIcon.svg' />}
            <div className='text-xs'>{data.name}</div>
        </div>
        )})}
    </div>
  )
}
