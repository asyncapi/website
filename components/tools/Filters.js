import { useState, useContext } from 'react';
import {twMerge} from 'tailwind-merge'
import {ToolFilterContext} from '../../context/ToolFilterContext'
import ArrowDown from '../icons/ArrowDown';
import FiltersDropdown from './FiltersDropdown';
import Button from '../buttons/Button'
import tags from '../../config/all-tags.json'
import {categoryList} from '../../scripts/tools/categorylist'

export default function Filters({setOpenFilter}) {
  // all the filter state variables and functions are extracted from the Context to set filters according to the UI.
  const {isPaid, isAsyncAPIOwner, languages, technologies, categories, setCategories, setLanguages, setTechnologies, setisPaid, setAsyncAPIOwner} = useContext(ToolFilterContext)
  
  // State variables to operate dropdowns of respective filters
  const [openLanguage, setopenLanguage] = useState(false)
  const [openTechnology, setopenTechnology] = useState(false)
  const [openCategory, setopenCategory] = useState(false)

  // Filter state variables for user checked values are created, initialising it with the values already set by user. 
  const [checkPaid, setCheckPaid] = useState(isPaid)
  const [checkedLanguage, setCheckedLanguage] = useState(languages)
  const [checkedTechnology, setCheckedTechnology] = useState(technologies)
  const [checkedCategory, setCheckedCategory] = useState(categories)
  const [checkOwner, setCheckOwner] = useState(isAsyncAPIOwner)

  // contains the list of languages and technologies
  let languageList = tags["languages"]
  let technologyList = tags["technologies"]

  // function to apply all the filters, which are selected, when `Apply Filters` is clicked.
  const handleApplyFilters = () => {
    setLanguages(checkedLanguage);
    setTechnologies(checkedTechnology)
    setCategories(checkedCategory)
    setisPaid(checkPaid)
    setAsyncAPIOwner(checkOwner)
    setOpenFilter(false)
  }

  // function to clear all the filters when `Clear Filters` is clicked.
  const clearFilters =() => {
    setLanguages([])
    setTechnologies([])
    setCategories([])
    setisPaid("all")
    setAsyncAPIOwner(false)
    setOpenFilter(false)
  }
  
  // function to display filtered domain
  const FilterDisplay = (props) => {
    return (
      <div className="max-w-lg flex gap-2 flex-wrap p-2 duration-200 delay-150">
        {props.checkedDomain.map((items, index) => {
          return (
            <div
              key={index}
              className={twMerge(
                `border border-secondary-600 text-secondary-600 p-1 pb-0 rounded-2xl flex gap-1 cursor-pointer items-start`
              )}
            >
              <div className="text-xs -mt-[1px] mb-[1px]">{items}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white z-20 py-4 border rounded-lg border-gray-300 shadow-md">
      <div className="flex flex-col gap-2 mx-4">
        <div className="flex gap-2 items-baseline justify-between">
          <div className="text-sm text-gray-500 uppercase">Pricing</div>
          <div className="text-xs mb-0 flex cursor-pointer hover:underline gap-0.5" onClick={clearFilters}>
            Clear Filters
          </div>
        </div>
        <div className="flex gap-2">
          <div className={twMerge(`bg-gray-200 px-4 py-2 flex gap-1 rounded-md hover:bg-secondary-100 border hover:border-secondary-500 cursor-pointer ${checkPaid==="free" ? 'bg-secondary-100 border-secondary-500' : ''}`)} onClick={() => (checkPaid === "free" ? setCheckPaid("all") : setCheckPaid("free"))}>
            <div className='text-sm'>Open Source</div>
            <img src="/img/illustrations/icons/FreeIcon.svg" />
          </div>
          <div className={`bg-gray-200 px-4 py-2 flex gap-1 rounded-md hover:bg-secondary-100 border hover:border-secondary-500 cursor-pointer ${checkPaid==="paid" ? 'bg-secondary-100 border-secondary-500' : ''}`} onClick={() => (checkPaid === "paid" ? setCheckPaid("all") : setCheckPaid("paid"))}>
            <div className='text-sm'>Commercial</div>
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
            <ArrowDown className={`my-auto ${openLanguage ? 'rotate-180' : ''}`} />
          </div>
          {openLanguage && <div className="bg-gray-200 border border-gray-400 w-auto rounded-b-lg duration-150 overflow-x-auto">
            <FiltersDropdown dataList={languageList} checkedOptions={checkedLanguage} setStateFunction={setCheckedLanguage} />
          </div>} 
          <FilterDisplay checkedDomain={checkedLanguage}/>
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
          <ArrowDown className={`my-auto ${openTechnology ? 'rotate-180' : ''}`} />
        </div>
        {openTechnology && <div className="bg-gray-200 border border-gray-400 w-auto rounded-b-lg duration-150 overflow-x-auto">
            <FiltersDropdown dataList={technologyList} checkedOptions={checkedTechnology} setStateFunction={setCheckedTechnology} />
          </div>}
          <FilterDisplay checkedDomain={checkedTechnology}/>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mx-4">
        <div className="text-sm text-gray-500">CATEGORY</div>
        <div className="w-full">
        <div className={twMerge(`px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openCategory ? 'rounded-b-none' : ''}`)} onClick={() => setopenCategory(!openCategory)}>
          <div className="flex items-center text-dark">
            Select categories...
          </div>
          <ArrowDown className={`my-auto ${openCategory ? 'rotate-180' : ''}`} />
        </div>
        {openCategory && <div className="bg-gray-200 border border-gray-400 w-auto rounded-b-lg duration-150 overflow-x-auto">
            <FiltersDropdown dataList={categoryList} checkedOptions={checkedCategory} setStateFunction={setCheckedCategory} />
          </div>}
          <FilterDisplay checkedDomain={checkedCategory}/>
        </div>
      </div>
      <hr className="my-4" />
      <div className='w-auto my-6 mx-4 mb-0' onClick={handleApplyFilters}>
        <Button text='Apply Filters' className='w-full' />
      </div>
    </div>
  );
}
