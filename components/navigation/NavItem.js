import Link from 'next/link'
import { useRouter } from 'next/router';
import NavItemDropdown from './../icons/NavItemDropdown';

export default function NavItem ({
  text,
  href,
  target = '_self',
  onClick = () => {},
  onMouseEnter = () => {},
  hasDropdown = false,
  className = '',
}) {
  const router = useRouter();
  if (href && !hasDropdown) {
    return (
      <Link href={href}>
        <a target={target} rel="noopener noreferrer" className={`${className} font-body text-base leading-6 font-semibold text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150 ${router.pathname.startsWith(href) ? "text-black" :"text-gray-700"}`}>
          {text}
        </a>
      </Link>
    )
  }

  // dom attributes common to both button and link
  const attrs = {
    onClick,
    onMouseEnter,
    className: `${className} group inline-flex items-center space-x-2 font-body text-base leading-6 font-semibold hover:text-gray-900 focus:outline-none focus:text-gray-900 tracking-heading transition ease-in-out duration-150`
  }

  if(href) {
    return (
      <Link href={href}>
        <a {...attrs} className={`${attrs.className} ${router.pathname.startsWith(href) ? "text-black" :"text-gray-700"}`} target={target} data-testid="NavItem-Link">
          <span>{text}</span>
          {hasDropdown && <NavItemDropdown />}
        </a>
      </Link>
    )
  }

  return (
    <button type="button" {...attrs} className={`${attrs.className} text-gray-700`}>
      <span>{text}</span>
      {hasDropdown && <NavItemDropdown />}
    </button>
  )
}
