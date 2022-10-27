import { useState, useContext } from 'react';
import {twMerge} from 'tailwind-merge'
import {ToolFilterContext} from '../../context/ToolFilterContext'
import ArrowDown from '../icons/ArrowDown';
import FiltersDropdown from './FiltersDropdown';
import Button from '../buttons/Button'
import {languagesColor, technologiesColor} from '../../scripts/tools/tags-color'

export default function Filters({setOpenFilter}) {
  const {isPaid, isAsyncAPIOwner, languages, technologies, setLanguages, setTechnologies, setisPaid, setAsyncAPIOwner} = useContext(ToolFilterContext)
  const [openLanguage, setopenLanguage] = useState(false)
  const [openTechnology, setopenTechnology] = useState(false)
  const [checkPaid, setCheckPaid] = useState(isPaid)
  const [checkedLanguage, setCheckedLanguage] = useState(languages)
  const [checkedTechnology, setCheckedTechnology] = useState(technologies)
  const [checkOwner, setCheckOwner] = useState(isAsyncAPIOwner)
  
  const handleApplyFilters = () => {
    setLanguages(checkedLanguage);
    setTechnologies(checkedTechnology)
    setisPaid(checkPaid)
    setAsyncAPIOwner(checkOwner)
    setOpenFilter({
      filter: false,
      category: false
    })
  }

  const clearFilters =() => {
    setLanguages([]);
    setTechnologies([])
    setisPaid(false)
    setAsyncAPIOwner(false)
    setOpenFilter({
      filter: false,
      category: false
    })
  }
  return (
    <div className="bg-white z-10 py-4 border rounded-lg border-gray-300">
      <div className="flex flex-col gap-2 mx-4">
        <div className="flex gap-2 items-baseline">
          <div className="text-sm text-gray-500">PRICING</div>
          <div className="text-xs mb-0 flex cursor-pointer hover:underline" onClick={clearFilters}>Clear Filters</div>
        </div>
        <div className="flex gap-2">
          <div className={twMerge(`bg-gray-200 px-4 py-2 flex gap-1 rounded-md hover:bg-secondary-100 border hover:border-secondary-500 cursor-pointer ${checkPaid==false ? 'bg-secondary-100 border-secondary-500' : ''}`)} onClick={() => setCheckPaid(false)}>
            <div>Free</div>
            <img src="/img/illustrations/icons/FreeIcon.svg" />
          </div>
          <div className={`bg-gray-200 px-4 py-2 flex gap-1 rounded-md hover:bg-secondary-100 border hover:border-secondary-500 cursor-pointer ${checkPaid==true ? 'bg-secondary-100 border-secondary-500' : ''}`} onClick={() => setCheckPaid(true)}>
            <div>Paid</div>
            <img src="/img/illustrations/icons/PaidIcon.svg" />
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mx-4">
        <div className="text-sm text-gray-500">OWNERSHIP</div>
        <div className="flex gap-4">
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value={checkOwner} className="sr-only peer" onChange={() => setCheckOwner(!checkOwner)} />
            <div className={twMerge(`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${checkOwner ? "after:translate-x-full after:border-white bg-secondary-500" : ''}`)}></div>
          </label>
          <div className="font-medium text-sm">
            Show only AsyncAPI-owned tools
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mx-4">
        <div className="text-sm text-gray-500">LANGUAGE</div>
        <div className="w-full">
          <div className={twMerge(`px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openLanguage ? 'rounded-b-none' : ''}`)} onClick={() => setopenLanguage(!openLanguage)}>
            <div className="flex items-center text-dark">
              Select Languages...
            </div>
            <ArrowDown className="my-auto" />
          </div>
          {openLanguage && <div className="bg-gray-200 w-auto rounded-b-lg duration-150 overflow-x-auto">
            <FiltersDropdown dataList={languagesColor} checkedOptions={checkedLanguage} setStateFunction={setCheckedLanguage} />
          </div>} 
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mx-4">
        <div className="text-sm text-gray-500">TECHNOLOGY</div>
        <div className="w-full">
        <div className={twMerge(`px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openTechnology ? 'rounded-b-none' : ''}`)} onClick={() => setopenTechnology(!openTechnology)}>
          <div className="flex items-center text-dark">
            Select technologies...
          </div>
          <ArrowDown className="my-auto" />
        </div>
        {openTechnology && <div className="bg-gray-200 w-auto rounded-b-lg duration-150 overflow-x-auto">
            <FiltersDropdown dataList={technologiesColor} checkedOptions={checkedTechnology} setStateFunction={setCheckedTechnology} />
          </div>}
        </div>
      </div>
      <div className='w-auto my-6 mx-4 mb-0' onClick={handleApplyFilters}>
        <Button text='Apply Filters' className='w-full' />
      </div>
    </div>
  );
}
