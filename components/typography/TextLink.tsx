import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextLinkProps {
  href: string;
  className?: string;
  target?: string;
  children?: React.ReactNode;
  id?: string;
}

/**
 *
 * @param {string} props.href contains a URL as href for a link
 * @param {string} props.className contains additional classes that should be added to the component
 * @param {string} props.target contains the target value for the link
 * @param {React.ReactNode} props.children contains all the child elements bounded inside component
 * @param {string} props.id contains an id to be appended on heading
 */
export default function TextLink({ href, className = '', target = '_blank', children, id }: TextLinkProps) {
  // eslint-disable-next-line max-len
  const classNames = twMerge(
    `text-secondary-500 underline hover:text-gray-800 font-medium transition ease-in-out duration-300 ${className || ''}`
  );

  return (
    <>
      {' '}
      <Link
        href={href}
        target={target}
        rel='noreferrer noopener'
        className={classNames}
        id={id}
        data-testid='TextLink-href'
      >
        {children}
      </Link>
    </>
  );
}
