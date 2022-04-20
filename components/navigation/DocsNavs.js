import Link from 'next/link';
import DocsNavItem from './DocsNavItem';

import IconHome from '../icons/Home'
import IconRocket from '../icons/Rocket'
import IconGradCap from '../icons/GradCap'
import IconPlant from '../icons/Plant'
import IconPaper from '../icons/Paper'

const icons = {
  'home': IconHome,
  'concepts': IconRocket,
  'tutorials': IconGradCap,
  'tools': IconPlant,
  'reference': IconPaper,
};

export default function DocsNavs({
  item,
  active,
  onClick = () => {},
}) {
  const { orphans, ...subCategories } = item.children;
  return (
    <li className='mb-4' key={item.item.title}>
      <DocsNavItem {...item.item} activeSlug={active} className='font-body font-regular text-sm text-black ml-1.5' activeClassName='font-semibold' Icon={icons[item.item.rootSectionId]} onClick={onClick} />
      <ul className='border-l border-gray-200 pl-4 ml-3 mt-1'>
        {orphans && orphans.map((orphan, index) => (
          <li key={orphan.title}>
            <DocsNavItem {...orphan} activeSlug={active} className={`font-body font-regular text-sm text-gray-700 leading-8 ${index === 0 ? '' : ''}`} activeClassName='text-secondary-600' onClick={onClick} />
          </li>
        ))}
        {Object.values(subCategories).map(subCategory => (
          <li key={subCategory.item.title}>
            <DocsNavItem {...subCategory.item} activeSlug={active} active={active.startsWith(subCategory.item.slug)} className='font-body font-regular text-sm text-black leading-8' activeClassName='font-semibold' onClick={onClick} />
            <ul className='border-l border-gray-200 pl-4'>
              {subCategory.children && subCategory.children.map(subItem => (
                <li key={subItem.title}>
                  <DocsNavItem {...subItem} activeSlug={active} className='font-body font-regular text-sm text-gray-700 leading-7' activeClassName='text-secondary-600' onClick={onClick} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );

  // const { slug, title, isSection, isRootSection } = item
  // const commonClassNames = 'flex transition ease-in-out duration-150 focus:outline-none tracking-tight'
  // const rootSectionClassNames = `mt-8 mb-2 text-gray-900 text-xs font-bold tracking-wide uppercase ${commonClassNames}`
  // const sectionClassNames = `mt-8 mb-2 text-gray-900 text-xxs font-bold tracking-wide uppercase ${commonClassNames}`
  // const activeItemClassNames = 'font-medium text-primary-500'
  // const nonActiveItemClassNames = 'font-regular text-gray-800 hover:text-primary-900'
  // const itemClassNames = `mb-3 text-sm ${commonClassNames} ${active ? activeItemClassNames : nonActiveItemClassNames}`

  // if (isRootSection) {
  //   return (
  //     <a className={rootSectionClassNames} onClick={onClick}>
  //       {title}
  //     </a>
  //   )
  // }

  // if (isSection) {
  //   return (
  //     <a className={sectionClassNames} onClick={onClick}>
  //       {title}
  //     </a>
  //   )
  // }

  // return (
  //   <Link href={slug}>
  //     <a className={itemClassNames} onClick={onClick}>
  //       {title}
  //     </a>
  //   </Link>
  // )
}
