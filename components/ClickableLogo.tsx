import Link from 'next/link';
import React from 'react';

import AsyncAPILogo from './logos/AsyncAPILogo';

interface IClickableLogoProps {
  href?: string;
  className?: string;
  logoClassName?: string;
}

/**
 * @description A component that displays the AsyncAPI logo as a clickable link
 * @param {string} props.href - The URL to link to
 * @param {string} props.className - The class name for the component
 * @param {string} props.logoClassName - The class name for the logo
 */
export default function ClickableLogo({ href = '/', className = 'flex', logoClassName }: IClickableLogoProps) {
  return (
    <Link href={href} className={className}>
      <AsyncAPILogo className={logoClassName} />
    </Link>
  );
}
