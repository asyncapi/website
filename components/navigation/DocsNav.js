import DocsNavItem from './DocsNavItem';
import IconHome from '../icons/Home';

import { buckets } from '../data/buckets';

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
  onClick = () => {},
}) {
  const subCategories = item.children;
  const bucket = serializedBuckets[item.item.rootSectionId];

  return (
    <li className='mb-4' key={item.item.title} data-testid="DocsNav-item">
      <DocsNavItem {...item.item} activeSlug={active} defaultClassName='font-body text-sm text-black hover:font-semibold' inactiveClassName='font-regular' activeClassName='font-semibold' bucket={bucket} onClick={onClick} />
      <ul className='border-l border-gray-200 pl-4 ml-3 mt-1'>
        {Object.values(subCategories).map((subCategory) => (
          <li key={subCategory.item.title}  data-testid="DocsNav-subitem">
            <DocsNavItem {...subCategory.item} activeSlug={active} defaultClassName={`font-body text-sm text-black leading-8 ${subCategory.children ? 'hover:font-semibold' : 'hover:text-secondary-600'}`} inactiveClassName='font-regular' activeClassName={subCategory.children ? 'font-semibold' : 'text-secondary-600'} onClick={onClick} />
            <ul className='border-l border-gray-200 pl-4'>
              {subCategory.children && subCategory.children.map(subItem => (
                <li key={subItem.title}>
                  <DocsNavItem {...subItem} activeSlug={active} defaultClassName='font-body text-sm text-gray-700 leading-7 hover:text-secondary-600' inactiveClassName='font-regular' activeClassName='text-secondary-600' onClick={onClick} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );
}
