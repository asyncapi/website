import { useRouter } from 'next/router';
import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react';

import type { ToolsListData } from '@/types/components/tools/ToolDataType';

import ToolsDataList from '../../config/tools.json';
import ToolFilter, { ToolFilterContext } from '../../context/ToolFilterContext';
import ArrowDown from '../icons/ArrowDown';
import Cross from '../icons/Cross';
import FilterIcon from '../icons/Filter';
import SearchIcon from '../icons/Search';
import CategoryDropdown from './CategoryDropdown';
import Filters from './Filters';
import ToolsList from './ToolsList';

const ToolsData = ToolsDataList as ToolsListData;

/**
 * @description This component displays Tools Dashboard.
 */
export default function ToolsDashboard() {
  const router = useRouter();
  const filterRef = useRef<HTMLDivElement>(); // used to provide ref to the Filter menu and outside click close feature
  // used to provide ref to the Category menu and outside click close feature
  const categoryRef = useRef<HTMLDivElement>();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openCategory, setopenCategory] = useState<boolean>(false);
  // filter parameters extracted from the context
  const { isPaid, isAsyncAPIOwner, languages, technologies, categories } = useContext(ToolFilterContext);
  const [searchName, setSearchName] = useState<string>(''); // state variable used to get the search name
  // state variable used to check whether any tool is available according to the needs of the user.
  const [checkToolsList, setCheckToolsList] = useState<boolean>(true);

  // useEffect function to enable the close Modal feature when clicked outside of the modal
  useEffect(() => {
    const checkIfClickOutside = (event: MouseEvent) => {
      if (openFilter && filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickOutside);
    };
  });

  // useEffect function to enable the close Category dropdown Modal feature when clicked outside of the modal
  useEffect(() => {
    const checkIfClickOutside = (event: MouseEvent) => {
      if (openCategory && categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setopenCategory(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickOutside);
    };
  });

  // useMemo function to filter the tools according to the filters applied by the user
  const toolsList = useMemo(() => {
    let tempToolsList: ToolsListData = {};

    // Tools data list is first filtered according to the category filter if applied by the user.
    // Hence if any category is selected, then only respective tools will be selected for further check on filters
    if (categories.length > 0) {
      for (const category of categories) {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        Object.keys(ToolsData).forEach((key) => {
          if (key === category) {
            tempToolsList[key] = JSON.parse(JSON.stringify(ToolsData[key]));
          }
        });
      }
    } else {
      // if no category is selected, then all tools are selected for further check on filters
      tempToolsList = JSON.parse(JSON.stringify(ToolsData));
    }

    // checkToolsList is initially made false to check whether any tools are present according to the filters.
    setCheckToolsList(false);

    // Each tool selected is then traversed to check against each filter variable (only if the filter is applied),
    // whether they match with the filter applied or not.
    Object.keys(tempToolsList).forEach((category) => {
      tempToolsList[category].toolsList = tempToolsList[category].toolsList.filter((tool) => {
        // These are filter check variables for respective filters, which are initially made true.
        // If the particular filter is applied by the user, the respective check variable is made false first,
        // and then tool parameters are checked against the filter variable value to decide
        // if it matches the filter criteria or not.
        let isLanguageTool = true;
        let isTechnologyTool = true;
        let isSearchTool = true;
        let isAsyncAPITool = true;
        let isPaidTool = true;

        if (languages.length) {
          isLanguageTool = false;
          for (const language of languages) {
            if (tool?.filters?.language && tool.filters.language.find((item) => item.name === language)) {
              isLanguageTool = true;
            }
          }
        }

        if (technologies.length) {
          isTechnologyTool = false;
          for (const technology of technologies) {
            if (tool?.filters?.technology && tool.filters.technology.find((item) => item.name === technology)) {
              isTechnologyTool = true;
            }
          }
        }

        if (searchName) {
          isSearchTool = tool.title.toLowerCase().includes(searchName.toLowerCase());
        }

        if (isAsyncAPIOwner) {
          isAsyncAPITool = tool.filters.isAsyncAPIOwner === isAsyncAPIOwner;
        }

        if (isPaid !== 'all') {
          if (isPaid === 'free') {
            isPaidTool = tool.filters.hasCommercial === false;
          } else {
            isPaidTool = tool.filters.hasCommercial === true;
          }
        }

        return isLanguageTool && isTechnologyTool && isSearchTool && isAsyncAPITool && isPaidTool;
      });

      if (tempToolsList[category].toolsList.length) {
        setCheckToolsList(true);
      }
    });

    Object.keys(tempToolsList).map((category) => {
      tempToolsList[category].elementRef = createRef();

      return tempToolsList;
    });

    return tempToolsList;
  }, [isPaid, isAsyncAPIOwner, languages, technologies, categories, searchName]);

  // useEffect to scroll to the opened category when url has category as element id
  useEffect(() => {
    const { hash } = window.location;

    if (hash) {
      const elementID = decodeURIComponent(hash.slice(1));
      const element = toolsList[elementID]?.elementRef!;

      if (element.current) {
        document.documentElement.style.scrollPaddingTop = '6rem';
        element.current.scrollIntoView({ behavior: 'smooth' });
        document.documentElement.style.scrollPaddingTop = '0';
      }
    }
  }, []);
  // Function to update the list of tools according to the current filters applied
  const clearFilters = () => {
    setOpenFilter(false);
    router.push('/tools', undefined, { shallow: true });
  };

  const isFiltered = Boolean(
    isPaid !== 'all' || isAsyncAPIOwner || languages.length || technologies.length || categories.length
  );

  return (
    <ToolFilter>
      <div>
        <div className='my-10 flex flex-wrap justify-between gap-4 lg:flex-nowrap'>
          <div className='flex h-auto w-[47%] gap-5 lg:w-1/5'>
            <div className='relative h-auto w-full' ref={filterRef as React.LegacyRef<HTMLDivElement>}>
              <div
                className='flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-1 text-sm text-gray-700 shadow hover:border-gray-600 hover:shadow-md'
                onClick={() => setOpenFilter(!openFilter)}
                data-testid='ToolsDashboard-Filters-Click'
              >
                <FilterIcon />
                <div>Filter</div>
              </div>
              {openFilter && (
                <button className='absolute top-16 z-20 min-w-[20rem]'>
                  <Filters setOpenFilter={setOpenFilter} />
                </button>
              )}
            </div>
          </div>
          <div className='flex h-auto w-[47%] gap-5 lg:w-1/5'>
            <div className='relative h-auto w-full' ref={categoryRef as React.LegacyRef<HTMLDivElement>}>
              <div
                className='flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-1 text-sm text-gray-700 shadow hover:border-gray-600 hover:shadow-md'
                onClick={() => setopenCategory(!openCategory)}
                data-testid='ToolsDashboard-category'
              >
                <div>Jump to Category</div>
                <ArrowDown className={`my-auto ${openCategory ? 'rotate-180' : ''}`} />
              </div>
              {openCategory && (
                <div className='absolute right-52 top-16 z-20'>
                  <CategoryDropdown setopenCategory={setopenCategory} />
                </div>
              )}
            </div>
          </div>
          <div className='flex h-14 w-full rounded-lg border border-gray-300 px-4 py-1 text-sm text-gray-700 shadow hover:border-gray-600 focus:border-gray-600 lg:w-4/5'>
            <SearchIcon className='my-auto opacity-70' />
            <input
              className='w-11/12 flex-1 border-none outline-none focus:ring-0'
              placeholder='Search by name'
              type='text'
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            {searchName && (
              <button className='my-auto h-fit rounded-full p-2 hover:bg-gray-100' onClick={() => setSearchName('')}>
                <img src='/img/illustrations/icons/close-icon.svg' alt='close' width='10' />
              </button>
            )}
          </div>
        </div>
        {isFiltered && (
          <div className='mt-4 flex cursor-pointer items-center text-gray-600 hover:text-black' onClick={clearFilters}>
            <Cross />
            <span className='ml-3'>Clear Filters</span>
          </div>
        )}
        <div className='mt-0'>
          {checkToolsList ? (
            <ToolsList toolsListData={toolsList} />
          ) : (
            <div className='p-4'>
              <img src='/img/illustrations/not-found.webp' alt='not found' className='m-auto w-1/2' />
              <div className='text-center text-lg'> Sorry, we don&apos;t have tools according to your needs. </div>
            </div>
          )}
        </div>
      </div>
    </ToolFilter>
  );
}
