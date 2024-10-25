import React, { useEffect, useState } from 'react';

import { buckets } from '../data/buckets';
import DocsArrow from '../icons/DocsArrow';
import IconHome from '../icons/Home';
import DocsNavItem from './DocsNavItem';
import SubCategoryDocsNav from './SubCategoryDocsNav';

export interface Bucket {
  name?: string;
  title?: string;
  description?: string;
  link?: string;
  className?: string;
  borderClassName?: string;
  href?: string;
  icon?: React.ComponentType<any> | null;
}

export interface SerializedBuckets {
  [key: string]: Bucket;
}

export interface DocsNavProps {
  item: {
    children: {
      [key: string]: any;
    };
    item: {
      rootSectionId: string;
      slug: string;
      title: string;
    };
  };
  active: string;
  onClick?: () => void;
}

const serializedBuckets: SerializedBuckets = buckets.reduce(
  (acc, bucket) => {
    // Create a new entry in the accumulator for the current bucket's name (or an empty string if missing)
    acc[bucket.name || ''] = {
      // Spread the existing properties of the bucket object into the new entry
      ...bucket,
      // Combine the existing className and borderClassName properties into a single className property
      className: `${bucket.className || ''} ${bucket.borderClassName || ''}`
    };

    return acc; // Return the updated accumulator for the next iteration
  },
  // Define an initial accumulator object with a pre-defined entry for "welcome" bucket
  {
    welcome: {
      icon: IconHome,
      className: 'bg-gray-300 border-gray-300'
    }
  } as SerializedBuckets // Initial value of the accumulator
);

/**
 * @description Component representing a navigation item in the documentation sidebar.
 * @param {Object} props - The props for the DocsNav component.
 * @param {DocsNavProps} props.item - The navigation item.
 * @param {string} props.active - The currently active navigation item.
 * @param {Function} [props.onClick=() => {}] - The function to be called when the navigation item is clicked.
 */
export default function DocsNav({ item, active, onClick = () => {} }: DocsNavProps) {
  const subCategories = item.children;
  const bucket = serializedBuckets[item.item.rootSectionId];
  const [openSubCategory, setOpenSubCategory] = useState(active.startsWith(item.item.slug));

  const onClickHandler = () => {
    setOpenSubCategory(!openSubCategory);
    onClick();
  };

  useEffect(() => {
    setOpenSubCategory(active.startsWith(item.item.slug));
  }, [active]);

  return (
    <li className='mb-4' key={item.item.title} data-testid='DocsNav-item'>
      <div className='flex gap-2'>
        <DocsArrow
          isDropDown={Object.values(subCategories).length > 0}
          activeDropDownItem={openSubCategory}
          onClick={() => setOpenSubCategory(!openSubCategory)}
        />
        <DocsNavItem
          {...item.item}
          activeSlug={active}
          defaultClassName='font-body text-sm text-black hover:font-semibold'
          inactiveClassName='font-regular'
          activeClassName='font-semibold'
          bucket={{
            className: bucket.className || '',
            icon: bucket.icon || IconHome
          }}
          onClick={onClickHandler}
        />
      </div>
      {openSubCategory && (
        <ul className='ml-3 mt-1 border-l border-gray-200 pl-4'>
          {Object.values(subCategories).map((subCategory: any) => (
            <SubCategoryDocsNav
              key={subCategory.item.title}
              subCategory={subCategory}
              activeItem={active}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
