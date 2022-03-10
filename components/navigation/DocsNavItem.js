import Link from 'next/link'

export default function DocsNavItem({
  item,
  active,
  onClick = () => {},
}) {
  const { slug, title, isSection, isRootSection } = item
  const commonClassNames = 'flex transition ease-in-out duration-150 focus:outline-none tracking-tight'
  const sectionClassNames = `mt-8 mb-2 text-gray-900 text-xs font-bold tracking-wide uppercase hover:text-primary-500 ${commonClassNames}`
  const designIsMyPassion = `mt-8 mb-2 text-gray-900 text-xxs font-bold tracking-wide uppercase hover:text-primary-500 ${commonClassNames}`
  const activeItemClassNames = 'font-medium text-primary-500'
  const nonActiveItemClassNames = 'font-regular text-gray-800 hover:text-primary-900'
  const itemClassNames = `mb-3 text-sm ${commonClassNames} ${active ? activeItemClassNames : nonActiveItemClassNames}`

  if (isRootSection) {
    return (
      <a className={sectionClassNames} onClick={onClick}>
        {title}
      </a>
    )
  }

  if (isSection) {
    return (
      <a className={designIsMyPassion} onClick={onClick}>
        SUB - {title}
      </a>
    )
  }

  return (
    <Link href={slug}>
      <a className={itemClassNames} onClick={onClick}>
        {title}
      </a>
    </Link>
  )
}
