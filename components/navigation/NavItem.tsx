import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import NavItemDropdown from '../icons/NavItemDropdown';

interface NavItemProps {
  text: string;
  href?: string;
  target?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  hasDropdown?: boolean;
  className?: string;
}

/**
 * @description NavItem component renders a navigation item.
 * @param {string} props.text - The text to be displayed in the navigation item.
 * @param {string} [props.href] - The URL to link to. If provided, the navigation item will be a link.
 * @param {string} [props.target='_self'] - The target attribute for the link.
 * @param {Function} [props.onClick] - Event handler for click event.
 * @param {Function} [props.onMouseEnter] - Event handler for mouse enter event.
 * @param {boolean} [props.hasDropdown=false] - Indicates if the navigation item has a dropdown menu.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function NavItem({
  text,
  href,
  target = '_self',
  onClick = () => {},
  onMouseEnter = () => {},
  hasDropdown = false,
  className = ''
}: NavItemProps) {
  const router = useRouter();

  if (href && !hasDropdown) {
    return (
      <Link
        href={href}
        target={target}
        rel='noopener noreferrer'
        className={`${className} font-body text-base font-semibold leading-6 text-gray-700 transition duration-150 ease-in-out hover:text-gray-900 focus:text-gray-900 focus:outline-none ${
          router.pathname.startsWith(href) ? 'text-black' : 'text-gray-700'
        }`}
      >
        {text}
      </Link>
    );
  }

  // Object 'attrs' defines HTML element attributes, including event handlers and styling classes.
  // 'onClick' and 'onMouseEnter' handle events, 'className' defines styling with hover and focus effects.
  const attrs = {
    onClick,
    onMouseEnter,
    className: `${className} group inline-flex items-center space-x-2 font-body text-base leading-6 font-semibold hover:text-gray-900 focus:outline-none focus:text-gray-900 tracking-heading transition ease-in-out duration-150`
  };

  if (href) {
    return (
      <Link
        href={href}
        {...attrs}
        className={`${attrs.className} ${router.pathname.startsWith(href) ? 'text-black' : 'text-gray-700'}`}
        target={target}
        data-testid='NavItem-Link'
      >
        <span>{text}</span>
        {hasDropdown && <NavItemDropdown />}
      </Link>
    );
  }

  return (
    <button type='button' {...attrs} className={`${attrs.className} text-gray-700`}>
      <span>{text}</span>
      {hasDropdown && <NavItemDropdown />}
    </button>
  );
}
