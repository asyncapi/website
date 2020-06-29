import Link from 'next/link'

export default function DocsNavItem({
  item,
  active,
  onClick = () => {},
}) {
  const { slug, title, isSection } = item
  const commonClassNames = 'flex px-2 transition ease-in-out duration-150 focus:outline-none'
  const sectionClassNames = `mt-8 mb-2 text-primary-800 text-xs font-medium uppercase hover:text-primary-800 ${commonClassNames}`
  const activeItemClassNames = 'font-medium text-primary-600'
  const nonActiveItemClassNames = 'font-thin hover:text-primary-800 hover:font-normal'
  const itemClassNames = `mb-3 text-sm ${commonClassNames} ${active ? activeItemClassNames : nonActiveItemClassNames}`

  if (isSection) {
    return (
      <a className={sectionClassNames} onClick={onClick}>
        {title}
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