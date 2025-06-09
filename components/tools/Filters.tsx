import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { Language, Technology, VisibleDataListType } from '@/types/components/tools/ToolDataType';

import tags from '../../config/all-tags.json';
import ToolFilter, { ToolFilterContext } from '../../context/ToolFilterContext';
import { categoryList } from '../../scripts/tools/categorylist';
import Data from '../../scripts/tools/tools-schema.json';
import Button from '../buttons/Button';
import ArrowDown from '../icons/ArrowDown';
import { CardData } from './CardData';
import FiltersDisplay from './FiltersDisplay';
import FiltersDropdown from './FiltersDropdown';
import Toggle from './Toggle';

interface FiltersProps {
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @description This component displays Filters.
 * @param {FiltersProps} props - Props for Filters component.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setOpenFilter - Function to set the state of filter.
 */
export default function Filters({ setOpenFilter }: FiltersProps) {
  const router = useRouter();
  // all the filter state variables and functions are extracted from the Context to set filters according to the UI.
  const { isPaid, isAsyncAPIOwner, languages, technologies, categories } = useContext(ToolFilterContext);

  // State variables to operate dropdowns of respective filters
  const [openLanguage, setopenLanguage] = useState<boolean>(false);
  const [openTechnology, setopenTechnology] = useState<boolean>(false);
  const [openCategory, setopenCategory] = useState<boolean>(false);

  // Filter state variables for user checked values are created, initialising it with the values already set by user.
  const [checkPaid, setCheckPaid] = useState<string>(isPaid);
  const [checkedLanguage, setCheckedLanguage] = useState<string[]>(languages);
  const [checkedTechnology, setCheckedTechnology] = useState<string[]>(technologies);
  const [checkedCategory, setCheckedCategory] = useState<string[]>(categories);
  const [checkOwner, setCheckOwner] = useState<boolean>(isAsyncAPIOwner);

  // useEffect hook used to update the UI elements
  useEffect(() => {
    setCheckedLanguage(languages);
    setCheckedTechnology(technologies);
    setCheckedCategory(categories);
    setCheckPaid(isPaid);
    setCheckOwner(isAsyncAPIOwner);
  }, [languages, technologies, categories, isPaid, isAsyncAPIOwner]);

  // contains the list of languages and technologies
  const languageList = tags.languages as Language[];
  const technologyList = tags.technologies as Technology[];

  // For Showing language, technology and category information
  const [visible, setVisible] = useState<VisibleDataListType>({
    lang: false,
    tech: false,
    category: false,
    pricing: false,
    ownership: false
  });

  // For showing the read more content of Language and Category information
  const [readMore, setReadMore] = useState(false);

  // function to apply all the filters, which are selected, when `Apply Filters` is clicked.
  const handleApplyFilters = () => {
    setOpenFilter(false);

    const searchParams = new URLSearchParams();

    // Set the params key only when the default value of the key changes.
    // This is to know when the user actually applies filter(s).

    if (checkPaid !== 'all') {
      searchParams.set('pricing', checkPaid);
    }
    if (checkOwner) {
      searchParams.set('owned', checkOwner ? 'true' : 'false');
    }
    if (checkedTechnology.length > 0) {
      searchParams.set('techs', checkedTechnology.join(','));
    }
    if (checkedLanguage.length > 0) {
      searchParams.set('langs', checkedLanguage.join(','));
    }
    if (checkedTechnology.length > 0) {
      searchParams.set('techs', checkedTechnology.join(','));
    }
    if (checkedCategory.length > 0) {
      searchParams.set('categories', checkedCategory.join(','));
    }

    router.push(
      {
        pathname: '/tools',
        query: searchParams.toString()
      },
      undefined,
      { shallow: true }
    );
  };

  // function to undo all the filters when `Undo Changes` is clicked.
  const undoChanges = () => {
    setCheckedLanguage(languages);
    setCheckedTechnology(technologies);
    setCheckedCategory(categories);
    setCheckPaid(isPaid);
    setCheckOwner(isAsyncAPIOwner);
  };

  return (
    <ToolFilter>
      <div className='z-20 rounded-lg border border-gray-300 bg-white py-4 shadow-md' data-testid='Filters-div'>
        <div className='mx-4 flex flex-col gap-2'>
          <div className='flex items-baseline justify-between gap-2'>
            <div className='text-sm text-gray-500'>
              <CardData
                heading='PRICING'
                data={Data.properties.filters.properties.hasCommercial.description}
                type='pricing'
                visible={visible}
                setVisible={setVisible}
                read={readMore}
                setRead={setReadMore}
              />
            </div>
            <div className='mb-0 flex cursor-pointer gap-0.5 text-xs hover:underline' onClick={undoChanges}>
              Undo Changes
            </div>
          </div>
          <div className='flex gap-2' data-testid='Applied-filters'>
            <div
              className={twMerge(
                `bg-gray-200 px-4 py-2 flex gap-1 rounded-md hover:bg-secondary-100 border hover:border-secondary-500 cursor-pointer ${checkPaid === 'free' ? 'bg-secondary-100 border-secondary-500' : ''}`
              )}
              onClick={() => (checkPaid === 'free' ? setCheckPaid('all') : setCheckPaid('free'))}
            >
              <div className='text-sm'>Open Source</div>
              <img src='/img/illustrations/icons/FreeIcon.svg' alt='Free' />
            </div>
            <div
              className={`flex cursor-pointer gap-1 rounded-md border bg-gray-200 px-4 py-2 hover:border-secondary-500 hover:bg-secondary-100 ${checkPaid === 'paid' ? 'border-secondary-500 bg-secondary-100' : ''}`}
              onClick={() => (checkPaid === 'paid' ? setCheckPaid('all') : setCheckPaid('paid'))}
            >
              <div className='text-sm'>Commercial</div>
              <img src='/img/illustrations/icons/PaidIcon.svg' alt='Paid' />
            </div>
          </div>
        </div>
        <hr className='my-4' />
        <div className='mx-4 flex flex-col gap-2'>
          <div className='text-left text-sm text-gray-500'>
            <CardData
              heading='OWNERSHIP'
              data='It describes whether the tools are maintained by AsyncAPI organization or not.'
              type='ownership'
              visible={visible}
              setVisible={setVisible}
              read={readMore}
              setRead={setReadMore}
            />
          </div>
          <div className='flex gap-4'>
            <Toggle checked={checkOwner} setChecked={setCheckOwner} label='Show only AsyncAPI-owned tools' />
          </div>
        </div>
        <hr className='my-4' />
        <div className='mx-4 flex flex-col gap-2' data-testid='Filters-Language-dropdown'>
          <CardData
            heading='LANGUAGE'
            data={Data.properties.filters.properties.language.description}
            type='lang'
            visible={visible}
            setVisible={setVisible}
            read={readMore}
            setRead={setReadMore}
          />
          <div className='w-full'>
            <div
              className={twMerge(
                `px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openLanguage ? 'rounded-b-none' : ''}`
              )}
              onClick={() => setopenLanguage(!openLanguage)}
            >
              <div className='flex items-center text-dark'>
                {/* eslint-disable-next-line no-nested-ternary */}
                {checkedLanguage.length > 0
                  ? checkedLanguage.length === 1
                    ? '1 option selected'
                    : `${checkedLanguage.length} options selected`
                  : 'Select Languages...'}
              </div>
              <ArrowDown className={`my-auto ${openLanguage ? 'rotate-180' : ''}`} />
            </div>
            {openLanguage && (
              <div className='w-auto overflow-x-auto rounded-b-lg border border-gray-400 bg-gray-200 duration-150'>
                <FiltersDropdown
                  dataList={languageList}
                  checkedOptions={checkedLanguage}
                  setCheckedOptions={setCheckedLanguage}
                />
              </div>
            )}
            <FiltersDisplay checkedOptions={checkedLanguage} setCheckedOptions={setCheckedLanguage} />
          </div>
        </div>
        <hr className='my-4' />
        <div className='mx-4 flex flex-col gap-2' data-testid='Filters-Technology-dropdown'>
          <CardData
            heading='TECHNOLOGY'
            data={Data.properties.filters.properties.technology.description}
            type='tech'
            visible={visible}
            setVisible={setVisible}
            read={readMore}
            setRead={setReadMore}
          />
          <div className='w-full'>
            <div
              className={twMerge(
                `px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openTechnology ? 'rounded-b-none' : ''}`
              )}
              onClick={() => setopenTechnology(!openTechnology)}
            >
              <div className='flex items-center text-dark'>
                {/* eslint-disable-next-line no-nested-ternary */}
                {checkedTechnology.length > 0
                  ? checkedTechnology.length === 1
                    ? '1 option selected'
                    : `${checkedTechnology.length} options selected`
                  : 'Select Technologies...'}
              </div>
              <ArrowDown className={`my-auto ${openTechnology ? 'rotate-180' : ''}`} />
            </div>
            {openTechnology && (
              <div className='w-auto overflow-x-auto rounded-b-lg border border-gray-400 bg-gray-200 duration-150'>
                <FiltersDropdown
                  dataList={technologyList}
                  checkedOptions={checkedTechnology}
                  setCheckedOptions={setCheckedTechnology}
                />
              </div>
            )}
            <FiltersDisplay checkedOptions={checkedTechnology} setCheckedOptions={setCheckedTechnology} />
          </div>
        </div>
        <hr className='my-4' />
        <div className='mx-4 flex flex-col gap-2' data-testid='Filters-Category-dropdown'>
          <CardData
            heading='CATEGORY'
            data={Data.properties.filters.properties.categories.description}
            type='category'
            visible={visible}
            setVisible={setVisible}
            read={readMore}
            setRead={setReadMore}
          />
          <div className='w-full'>
            <div
              className={twMerge(
                `px-4 py-2 flex justify-between rounded-lg border border-gray-400 w-full bg-gray-200 text-gray-700 shadow text-sm cursor-pointer ${openCategory ? 'rounded-b-none' : ''}`
              )}
              onClick={() => setopenCategory(!openCategory)}
            >
              <div className='flex items-center text-dark'>
                {/* eslint-disable-next-line no-nested-ternary */}
                {checkedCategory.length > 0
                  ? checkedCategory.length === 1
                    ? '1 option selected'
                    : `${checkedCategory.length} options selected`
                  : 'Select Categories...'}
              </div>
              <ArrowDown className={`my-auto ${openCategory ? 'rotate-180' : ''}`} />
            </div>
            {openCategory && (
              <div className='w-auto overflow-x-auto rounded-b-lg border border-gray-400 bg-gray-200 duration-150'>
                <FiltersDropdown
                  dataList={categoryList}
                  checkedOptions={checkedCategory}
                  setCheckedOptions={setCheckedCategory}
                />
              </div>
            )}
            <FiltersDisplay checkedOptions={checkedCategory} setCheckedOptions={setCheckedCategory} />
          </div>
        </div>
        <hr className='my-4' />
        <div className='mx-4 my-6 mb-0 w-auto' onClick={handleApplyFilters}>
          <Button text='Apply Filters' className='w-full' />
        </div>
      </div>
    </ToolFilter>
  );
}
