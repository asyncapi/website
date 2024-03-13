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
 * @param {ClickableLogoProps} props - The props for the component.
 */
export default function ClickableLogo({ href = '/', className = 'flex', logoClassName }: ClickableLogoProps) {
  return (
    <Link href={href}>
      <a className={className}>
        <AsyncAPILogo className={logoClassName || ''} />
      </a>
    </Link>
  );
}
