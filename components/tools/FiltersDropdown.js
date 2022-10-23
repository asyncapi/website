import { useState, useContext, useEffect } from "react"
import { ToolFilterContext } from '../../context/ToolFilterContext';
import { twMerge } from "tailwind-merge";

export default function FiltersDropdown({dataList=[]}) {
  const {isPaid} = useContext(ToolFilterContext)
  console.log(isPaid)
  
  const [checkedArray, setCheckedArray] = useState([])
  // useEffect(() => {}, [checkedArray])

  const handleClickOption = (value) => {
    let tempCheckedArray = [...checkedArray]
    let index = checkedArray.indexOf(value)
    if(index>-1){
      tempCheckedArray.splice(index, 1);
    }else{
      tempCheckedArray.push(value);
    }
    setCheckedArray(tempCheckedArray)
  }
  return (
    <div className='max-w-lg flex gap-2 flex-wrap p-2'>
      {dataList.map((data, index) => {
        let checked = checkedArray.indexOf(index)!=-1 ? true : false
        return (
          <div key={index} className={twMerge(`border border-secondary-600 text-secondary-600 p-1 pb-0 rounded-2xl flex gap-1 cursor-pointer items-start ${checked ? 'bg-secondary-600 text-white' : ''}`)} onClick={() => handleClickOption(index)}>
            {checked ? <img src='/img/illustrations/icons/CheckedIcon.svg' /> : <img src='/img/illustrations/icons/UncheckedIcon.svg' />}
            <div className='text-xs'>{data.name}</div>
        </div>
        )})}
    </div>
  )
}
