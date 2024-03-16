import Link from 'next/link';
import React from 'react';

import AsyncAPILogo from './AsyncAPILogo';

interface ClickableLogoProps {
  href?: string;
  className?: string;
  logoClassName?: string;
}

/**
 * @description Renders a logo that is clickable and redirects to a specified URL.
 * @param {string} [href='/'] - The URL to redirect to when the logo is clicked.
 * @param {string} [className='flex'] - The CSS class for the container of the logo.
 * @param {string} [logoClassName] - The CSS class for the logo itself.
 */
export default function ClickableLogo({ href = '/', className = 'flex', logoClassName }: ClickableLogoProps) {
  return (
    <Link href={href}>
      <span className={className}>
        <AsyncAPILogo className={logoClassName || ''} />
      </span>
    </Link>
  );
}
