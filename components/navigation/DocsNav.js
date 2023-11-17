import React, { useState } from 'react';
import DocsNavItem from './DocsNavItem';
import IconHome from '../icons/Home';
import SubCategoryDocsNav from './SubCategoryDocsNav';
import DocsArrow from '../icons/DocsArrow';

import { buckets } from '../data/buckets';
import { useEffect } from 'react';


const serializedBuckets = buckets.reduce((acc, bucket) => {
  acc[bucket.name] = {
    ...bucket,
    className: `${bucket.className} ${bucket.borderClassName}`,
  };
  return acc;
}, {
  welcome: {
    icon: IconHome,
    className: 'bg-gray-300 border-gray-300',
  },
});

export default function DocsNav({
  item,
  active,
  onClick = () => { },
}) {
  const subCategories = item.children;
  const bucket = serializedBuckets[item.item.rootSectionId];

  const [openSubCategory, setOpenSubCategory] = useState(active.startsWith(item.item.slug));

  const onClickHandler = () => {
    setOpenSubCategory(!openSubCategory);
    onClick();
  }

  useEffect(() => {
    setOpenSubCategory(active.startsWith(item.item.slug));
  }, [active])

  return (
    <li className='mb-4' key={item.item.title} data-testid="DocsNav-item">
      <div className='flex gap-2'>
        <DocsArrow isDropDown={Object.values(subCategories).length > 0} activeDropDown={openSubCategory} onClick={() => setOpenSubCategory(!openSubCategory)} />
        <DocsNavItem {...item.item} activeSlug={active} defaultClassName='font-body text-sm text-black hover:font-semibold' inactiveClassName='font-regular' activeClassName='font-semibold' bucket={bucket} onClick={onClickHandler} />
      </div>
      {openSubCategory && (
        <ul className='border-l border-gray-200 pl-4 ml-3 mt-1'>
          {Object.values(subCategories).map((subCategory) => (
            <SubCategoryDocsNav key={subCategory.item.title} subCategory={subCategory} active={active} onClick={onClick} />
          ))}
        </ul>
      )}
    </li>
  );
}
