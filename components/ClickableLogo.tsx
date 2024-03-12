import Link from 'next/link';
import React from 'react';

import AsyncAPILogo from './AsyncAPILogo';

interface ClickableLogoProps {
  href?: string;
  className?: string;
  logoClassName?: string;
}

export default function ClickableLogo({ href = '/', className = 'flex', logoClassName }: ClickableLogoProps) {
  return (
    <Link href={href}>
      <a className={className}>
        <AsyncAPILogo className={logoClassName || ''} />
      </a>
    </Link>
  );
}
