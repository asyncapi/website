import type { ReactNode } from 'react';
import React from 'react';

interface StyledLinkProps {
  href: string;
  children: ReactNode;
}

export const StyledLink = ({ href, children }: StyledLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={[
      'border-b border-secondary-400',
      'font-semibold text-gray-900',
      'transition duration-300 ease-in-out',
      'hover:border-secondary-500',
      'font-body antialiased',
    ].join(' ')}
  >
    {children}
  </a>
);
