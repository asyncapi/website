import { useEffect, useState } from 'react';

import type { DocsNavProps, SerializedBuckets  } from '@/types/navigation/DocsNav';

import { buckets } from '../data/buckets';
import DocsArrow from '../icons/DocsArrow';
import IconHome from '../icons/Home';
import DocsNavItem from './DocsNavItem';
import SubCategoryDocsNav from './SubCategoryDocsNav';

const serializedBuckets: SerializedBuckets = buckets.reduce((acc, bucket) => {
  acc[bucket.name || ''] = {
    ...bucket,
    className: `${bucket.className || ''} ${bucket.borderClassName || ''}`
  };

  return acc;
}, {
  welcome: {
    icon: IconHome,
    className: 'bg-gray-300 border-gray-300'
  }
} as SerializedBuckets);

/**
 * @description Component representing a navigation item in the documentation sidebar.
 * @param {DocsNavProps} props - The props for the DocsNav component.
 */
export default function DocsNav({
  item,
  active,
  onClick = () => {}
}:DocsNavProps) {
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
        <DocsArrow isDropDown={Object.values(subCategories).length > 0} activeDropDownItem={openSubCategory} onClick={() => setOpenSubCategory(!openSubCategory)} />
        <DocsNavItem {...item.item} activeSlug={active} defaultClassName='font-body text-sm text-black hover:font-semibold' inactiveClassName='font-regular' activeClassName='font-semibold' bucket={{
          className: bucket.className || '',
          icon: bucket.icon || IconHome
        }} onClick={onClickHandler} />
      </div>
      {openSubCategory && (
        <ul className='ml-3 mt-1 border-l border-gray-200 pl-4'>
          {Object.values(subCategories).map((subCategory: any) => (
            <SubCategoryDocsNav key={subCategory.item.title} subCategory={subCategory} activeItem={active} onClick={onClick} />
          ))}
        </ul>
      )}
    </li>
  );
}
