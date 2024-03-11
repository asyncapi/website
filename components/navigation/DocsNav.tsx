import React, { useState, useEffect } from 'react';
import DocsNavItem from './DocsNavItem';
import IconHome from '../icons/Home';
import SubCategoryDocsNav from './SubCategoryDocsNav';
import DocsArrow from '../icons/DocsArrow';
import { buckets } from '../data/buckets';

interface Bucket {
  name?: string;
  title?: string;
  description?: string;
  link?: string;
  className?: string;
  borderClassName?: string;
  Icon?: React.ComponentType<any>;
  href?: string;
  icon?: React.ComponentType<any> | null;
}

interface SerializedBuckets {
  [key: string]: Bucket;
}

const serializedBuckets: SerializedBuckets = buckets.reduce((acc, bucket) => {
  acc[bucket.name || ''] = {
    ...bucket,
    className: `${bucket.className || ''} ${bucket.borderClassName || ''}`,
  };
  return acc;
}, {
  welcome: {
    icon: IconHome,
    className: 'bg-gray-300 border-gray-300',
  },
} as SerializedBuckets);

interface DocsNavProps {
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

const DocsNav: React.FC<DocsNavProps> = ({
  item,
  active,
  onClick = () => {},
}) => {
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
        <DocsArrow isDropDown={Object.values(subCategories).length > 0} activeDropDownItem={openSubCategory} onClick={() => setOpenSubCategory(!openSubCategory)} />
        <DocsNavItem {...item.item} activeSlug={active} defaultClassName='font-body text-sm text-black hover:font-semibold' inactiveClassName='font-regular' activeClassName='font-semibold' bucket={{
          className: bucket.className || '',
          icon: bucket.icon || IconHome,
        }} onClick={onClickHandler} />
      </div>
      {openSubCategory && (
        <ul className='border-l border-gray-200 pl-4 ml-3 mt-1'>
          {Object.values(subCategories).map((subCategory: any) => (
            <SubCategoryDocsNav key={subCategory.item.title} subCategory={subCategory} activeItem={active} onClick={onClick} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default DocsNav;
