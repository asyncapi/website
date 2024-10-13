import React from 'react';

interface AsyncAPIColorLogoProps {
  // eslint-disable-next-line prettier/prettier

  /** The alt text for the logo. */
  alt?: string;

  /** Additional classes for the logo. */
  className?: string;
}

/**
 * The AsyncAPIColorIcon component is the logo for AsyncAPI in color mode.
 */
export default function AsyncAPIColorIcon({ alt = 'AsyncAPI Icon', className = '' }: AsyncAPIColorLogoProps) {
  const loaderIconPath: string = 'img/loaders/loader.png';

  return <img alt={alt} src={loaderIconPath} className={className || 'mx-auto w-16'} />;
}
