import DocsNavItem from './DocsNavItem';

import IconHome from '../icons/Home'
import IconRocket from '../icons/Rocket'
import IconGradCap from '../icons/GradCap'
import IconPlant from '../icons/Plant'
import IconGuide from '../icons/Guide'
import IconPaper from '../icons/Paper'

const buckets = {
  'welcome': {
    icon: IconHome,
    className: 'bg-gray-300 border-gray-300',
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
  'guides': {
    icon: IconGuide,
    className: 'bg-primary-200 border-primary-200',
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
  const subCategories = item.children;
  return (
    <li className='mb-4' key={item.item.title}>
      <DocsNavItem {...item.item} activeSlug={active} defaultClassName='font-body text-sm text-black hover:font-semibold' inactiveClassName='font-regular' activeClassName='font-semibold' bucket={buckets[item.item.rootSectionId]} onClick={onClick} />
      <ul className='border-l border-gray-200 pl-4 ml-3 mt-1'>
        {Object.values(subCategories).map((subCategory) => (
          <li key={subCategory.item.title}>
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
