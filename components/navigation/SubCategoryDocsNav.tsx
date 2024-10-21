import React, { useEffect, useState } from 'react';

import DocsArrow from '../icons/DocsArrow';
import DocsNavItem from './DocsNavItem';

export interface SubCategoryDocsNavProps {
  subCategory: {
    item: {
      title: string;
      slug: string;
      href?: string;
    };
    children?: {
      title: string;
      slug: string;
      href?: string;
    }[];
  };
  activeItem: string;
  onClick: () => void;
}

/**
 * @description Renders a navigation component for a subcategory in the documentation.
 * @param {Object} props - The properties passed to the SubCategoryDocsNav component.
 * @param {Object} props.subCategory - The subcategory object containing item and children properties.
 * @param {string} props.activeItem - The slug of the currently active item.
 * @param {Function} props.onClick - The onClick event handler.
 */
export default function SubCategoryDocsNav({ subCategory, activeItem, onClick }: SubCategoryDocsNavProps) {
  const [openSubCategoryChildren, setOpenSubCategoryChildren] = useState(activeItem.startsWith(subCategory.item.slug));

  const onClickHandler = () => {
    setOpenSubCategoryChildren(!openSubCategoryChildren);
    onClick();
  };

  useEffect(() => {
    setOpenSubCategoryChildren(activeItem.startsWith(subCategory.item.slug));
  }, [activeItem, subCategory.item.slug]);

  return (
    <li key={subCategory.item.title} data-testid='DocsNav-subitem'>
      <div className='flex gap-2'>
        <DocsArrow
          isDropDown={!!subCategory.children}
          activeDropDownItem={openSubCategoryChildren}
          onClick={() => setOpenSubCategoryChildren(!openSubCategoryChildren)}
        />
        <DocsNavItem
          {...subCategory.item}
          activeSlug={activeItem}
          defaultClassName={`font-body text-sm text-black leading-8 ${
            subCategory.children ? 'hover:font-semibold' : 'hover:text-secondary-600'
          }`}
          inactiveClassName='font-regular'
          activeClassName={subCategory.children ? 'font-semibold' : 'text-secondary-600'}
          onClick={onClickHandler}
        />
      </div>
      {openSubCategoryChildren && (
        <ul className='ml-8 border-l border-gray-200 pl-4'>
          {subCategory.children &&
            subCategory.children.map((subItem) => (
              <li key={subItem.title}>
                <DocsNavItem
                  {...subItem}
                  activeSlug={activeItem}
                  defaultClassName='font-body text-sm text-gray-700 leading-7 hover:text-secondary-600'
                  inactiveClassName='font-regular'
                  activeClassName='text-secondary-600'
                  onClick={onClick}
                />
              </li>
            ))}
        </ul>
      )}
    </li>
  );
}
