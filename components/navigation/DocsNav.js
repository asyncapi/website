import Link from 'next/link';
import DocsNavItem from './DocsNavItem';

import IconHome from '../icons/Home'
import IconRocket from '../icons/Rocket'
import IconGradCap from '../icons/GradCap'
import IconPlant from '../icons/Plant'
import IconPaper from '../icons/Paper'

const buckets = {
  'welcome': {
    icon: IconHome,
    className: 'bg-primary-200 border-primary-200',
  },
  'concepts': {
    icon: IconRocket,
    className: 'bg-secondary-200 border-secondary-200',
  },
  'tutorials': {
    icon: IconGradCap,
    className: 'bg-pink-100 border-pink-100',
  },
  'tools': {
    icon: IconPlant,
    className: 'bg-green-200 border-green-200',
  },
  'reference': {
    icon: IconPaper,
    className: 'bg-yellow-200 border-yellow-200',
  },
};

export default function DocsNav({
  item,
  active,
  onClick = () => {},
}) {
  const { orphans, ...subCategories } = item.children;
  return (
    <li className='mb-4' key={item.item.title}>
      <DocsNavItem {...item.item} activeSlug={active} className='font-body font-regular text-sm text-black hover:font-semibold' activeClassName='font-semibold' bucket={buckets[item.item.rootSectionId]} onClick={onClick} />
      <ul className='border-l border-gray-200 pl-4 ml-3 mt-1'>
        {orphans && orphans.map(orphan => (
          <li key={orphan.title}>
            <DocsNavItem {...orphan} activeSlug={active} className={`font-body font-regular text-sm text-gray-700 leading-8 hover:text-secondary-600`} activeClassName='text-secondary-600' onClick={onClick} />
          </li>
        ))}
        {Object.values(subCategories).map(subCategory => (
          <li key={subCategory.item.title}>
            <DocsNavItem {...subCategory.item} activeSlug={active} active={active.startsWith(subCategory.item.slug)} className='font-body font-regular text-sm text-black leading-8 hover:font-semibold' activeClassName='font-semibold' onClick={onClick} />
            <ul className='border-l border-gray-200 pl-4'>
              {subCategory.children && subCategory.children.map(subItem => (
                <li key={subItem.title}>
                  <DocsNavItem {...subItem} activeSlug={active} className='font-body font-regular text-sm text-gray-700 leading-7 hover:text-secondary-600' activeClassName='text-secondary-600' onClick={onClick} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );
}
