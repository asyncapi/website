import { useState } from 'react';
import {twMerge} from 'tailwind-merge'
import ArrowDown from '../icons/ArrowDown';
import FiltersDropdown from './FiltersDropdown';
export default function Filters() {
  
  const [openLanguage, setopenLanguage] = useState(false)
  const [openTechnology, setopenTechnology] = useState(false)
  const [isPaid, setIsPaid] = useState(0)
  return (
    <div className="bg-white z-10 py-4 border rounded-lg border-gray-300">
      <div className="flex flex-col gap-2 mx-4">
        <div className="flex gap-2">
          <div className="text-sm text-gray-500">PRICING</div>
          <div className="text-xs mb-0 flex items-center">Clear Filters</div>
        </div>
        <div className="flex gap-2">
          <div className={twMerge(`bg-gray-200 px-4 py-2 flex gap-1 rounded-md hover:bg-secondary-100 border hover:border-secondary-500 cursor-pointer ${isPaid==0 ? 'bg-secondary-100 border-secondary-500' : ''}`)} onClick={() => setIsPaid(0)}>
            <div>Free</div>
            <img src="/img/illustrations/icons/FreeIcon.svg" />
          </div>
          <div className={`bg-gray-200 px-4 py-2 flex gap-1 rounded-md hover:bg-secondary-100 border hover:border-secondary-500 cursor-pointer ${isPaid==1 ? 'bg-secondary-100 border-secondary-500' : ''}`} onClick={() => setIsPaid(1)}>
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
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-500"></div>
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
            <FiltersDropdown />
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
            <FiltersDropdown />
          </div>}
        </div>
      </div>
    </div>
  );
}
