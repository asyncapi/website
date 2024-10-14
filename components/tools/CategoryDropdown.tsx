import React from 'react';

import type { ToolsListData } from '@/types/components/tools/ToolDataType';

import ToolsDataList from '../../config/tools.json';

interface CategoryDropdownProps {
  setopenCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolsData = ToolsDataList as ToolsListData;

/**
 * @description This component displays Category Dropdown.
 *
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setopenCategory - Function to set dropdown status.
 */
export default function CategoryDropdown({ setopenCategory }: CategoryDropdownProps) {
  return (
    <div
      className='absolute z-10 h-60 w-52 origin-top-right overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none lg:w-56'
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='menu-button'
      data-testid='CategoryDropdown-div'
    >
      <div className='py-1' role='none'>
        {Object.keys(ToolsData).map((categoryName, index) => {
          // displaying tools category having atleast one tool
          if (ToolsData[categoryName].toolsList.length > 0) {
            return (
              <div key={index} onClick={() => setopenCategory(false)}>
                <a
                  href={`#${categoryName}`}
                  key={index}
                  className='block px-4 py-2 hover:bg-gray-100'
                  data-testid='CategoryDropdown-link'
                >
                  {categoryName}
                </a>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
