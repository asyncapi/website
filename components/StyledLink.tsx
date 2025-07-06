import React, { ReactNode } from 'react';

interface StyledLinkProps {
  href: string;
  children: ReactNode;
}

export const StyledLink: React.FC<StyledLinkProps> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="border-b border-secondary-400 font-semibold text-gray-900 transition duration-300 ease-in-out hover:border-secondary-500 font-body antialiased"
  >
    {children}
  </a>
);
