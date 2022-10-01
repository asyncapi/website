import { useState, useContext } from "react"
import { ToolFilterContext } from '../../context/ToolFilterContext';

export default function FiltersDropdown() {
  const {isPaid} = useContext(ToolFilterContext)
  console.log(isPaid)
  // Will check each element name in the checked array and then specify the border and text color to it.
  const [checkedArray, setCheckedArray] = useState([])
  return (
    <div className='max-w-lg flex gap-4 flex-wrap p-2'>
        <div className={`border border-secondary-600 text-secondary-600 p-1 rounded-2xl flex gap-1 cursor-pointer`}>
            <img src='/img/illustrations/icons/UncheckedIcon.svg' />
            <div className='text-xs'>Javascript</div>
        </div>
        {/* <div className='border border-secondary-600 text-secondary-600 p-1 rounded-2xl flex gap-1'>
        <img src='/img/illustrations/icons/UncheckedIcon.svg' />
            <div className='text-xs'>C++</div>
        </div>
        <div className='border border-secondary-600 bg-secondary-600 text-white p-1 rounded-2xl flex gap-1'>
            <img src='/img/illustrations/icons/CheckedIcon.svg' />
            <div className='text-xs'>HTML</div>
        </div> */}
    </div>
  )
}
