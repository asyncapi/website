import { useState, useContext } from 'react';
import {twMerge} from 'tailwind-merge'
import {ToolFilterContext} from '../../context/ToolFilterContext'
import ArrowDown from '../icons/ArrowDown';
import FiltersDropdown from './FiltersDropdown';
import FiltersDisplay from './FiltersDisplay';
import Button from '../buttons/Button'
import tags from '../../config/all-tags.json'
import {categoryList} from '../../scripts/tools/categorylist'
import Data from "../../scripts/tools/tools-schema.json"
import { Carddata } from './Carddata';

export default function Filters({setOpenFilter, setIsFiltered}) {
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

  // For Showing language, technology and category information
  const [visible, setVisible] = useState({
    lang : false,
    tech: false,
    category: false,
    pricing : false,
    ownership: false
  })

  // For showing the read more content of Language and Category information
  const [readMore , setReadMore] = useState(false)

  // function to apply all the filters, which are selected, when `Apply Filters` is clicked.
  const handleApplyFilters = () => {
    setIsFiltered(true);
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

  return (
    <div className="bg-white z-20 py-4 border rounded-lg border-gray-300 shadow-md">
      <div className="flex flex-col gap-2 mx-4">
        <div className="flex gap-2 items-baseline justify-between">
          <div className="text-sm text-gray-500">
          <Carddata heading="PRICING" data ={Data.properties.filters.properties.hasCommercial.description}  type="pricing" visible = {visible} setVisible = {setVisible} read={readMore} setRead ={setReadMore} />
          </div>
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
        <div className="text-sm text-gray-500">
        <Carddata heading="OWNERSHIP" data = "It describes whether the tools are maintained by AsyncAPI organization or not."  type="ownership" visible = {visible} setVisible = {setVisible} read={readMore} setRead ={setReadMore} />
        </div>
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
        <Carddata heading="LANGUAGE" data = {Data.properties.filters.properties.language.description} type="lang" visible = {visible} setVisible = {setVisible} read={readMore} setRead ={setReadMore} />
        <div className="w-full">
          <div className={twMerge(`px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openLanguage ? 'rounded-b-none' : ''}`)} onClick={() => setopenLanguage(!openLanguage)}>
            <div className="flex items-center text-dark">
              {checkedLanguage.length>0 ? (checkedLanguage.length===1 ? `1 option selected` : `${checkedLanguage.length} options selected`) : `Select Languages...`}
            </div>
            <ArrowDown className={`my-auto ${openLanguage ? 'rotate-180' : ''}`} />
          </div>
          {openLanguage && <div className="bg-gray-200 border border-gray-400 w-auto rounded-b-lg duration-150 overflow-x-auto">
            <FiltersDropdown dataList={languageList} checkedOptions={checkedLanguage} setStateFunction={setCheckedLanguage} />
          </div>} 
          <FiltersDisplay checkedValues={checkedLanguage} setValues={setCheckedLanguage}/>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mx-4">
      <Carddata heading="TECHNOLOGY" data = {Data.properties.filters.properties.technology.description} type="tech" visible = {visible} setVisible = {setVisible} read={readMore} setRead ={setReadMore} />
        <div className="w-full">
        <div className={twMerge(`px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openTechnology ? 'rounded-b-none' : ''}`)} onClick={() => setopenTechnology(!openTechnology)}>
          <div className="flex items-center text-dark">
          {checkedTechnology.length>0 ? (checkedTechnology.length===1 ? `1 option selected` : `${checkedTechnology.length} options selected`) : `Select Technologies...`}
          </div>
          <ArrowDown className={`my-auto ${openTechnology ? 'rotate-180' : ''}`} />
        </div>
        {openTechnology && <div className="bg-gray-200 border border-gray-400 w-auto rounded-b-lg duration-150 overflow-x-auto">
            <FiltersDropdown dataList={technologyList} checkedOptions={checkedTechnology} setStateFunction={setCheckedTechnology} />
          </div>}
          <FiltersDisplay checkedValues={checkedTechnology} setValues={setCheckedTechnology}/>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mx-4">
      <Carddata heading="CATEGORY" data = {Data.properties.filters.properties.categories.description} type="category" visible = {visible} setVisible = {setVisible} read={readMore} setRead ={setReadMore} />
        <div className="w-full">
        <div className={twMerge(`px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openCategory ? 'rounded-b-none' : ''}`)} onClick={() => setopenCategory(!openCategory)}>
          <div className="flex items-center text-dark">
          {checkedCategory.length>0 ? (checkedCategory.length===1 ? `1 option selected` : `${checkedCategory.length} options selected`) : `Select Categories...`}
          </div>
          <ArrowDown className={`my-auto ${openCategory ? 'rotate-180' : ''}`} />
        </div>
        {openCategory && <div className="bg-gray-200 border border-gray-400 w-auto rounded-b-lg duration-150 overflow-x-auto">
            <FiltersDropdown dataList={categoryList} checkedOptions={checkedCategory} setStateFunction={setCheckedCategory} />
          </div>}
          <FiltersDisplay checkedValues={checkedCategory} setValues={setCheckedCategory}/>
        </div>
      </div>
      <hr className="my-4" />
      <div className='w-auto my-6 mx-4 mb-0' onClick={handleApplyFilters}>
        <Button text='Apply Filters' className='w-full' />
      </div>
    </div>
  );
}