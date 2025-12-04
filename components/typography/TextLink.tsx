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
  const classNames = twMerge(
    `
      text-blue-600
      hover:text-blue-700
      font-medium
      underline-offset-4
      hover:underline
      transition-all
      duration-200
      ease-out
      ${className}
    `
  );

  return (
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
  );
}
