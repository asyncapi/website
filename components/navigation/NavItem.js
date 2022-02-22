import Link from 'next/link'
export default function NavItem ({
  text,
  href,
  target = '_self',
  onClick = () => {},
  hasDropdown = false,
  className = '',
}) {
  if (href) {
    return (
      <Link href={href}>
      <a target={target} rel="noopener noreferrer" className={`${className} font-body text-base leading-6 font-semibold text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150`}>
        {text}
      </a>
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${className} group text-gray-700 inline-flex items-center space-x-2 text-base leading-6 font-semibold hover:text-gray-900 focus:outline-none focus:text-gray-900 tracking-heading transition ease-in-out duration-150`}>
      <span>{text}</span>
      {
        hasDropdown && (
          <svg className="text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )
      }
    </button>
  )
}