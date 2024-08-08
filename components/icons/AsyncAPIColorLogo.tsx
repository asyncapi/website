interface AsyncAPIColorLogoProps {
  // eslint-disable-next-line prettier/prettier

  /** The alt text for the logo. */
  alt: string;

  /** Additional classes for the logo. */
  className?: string;
}

/**
 * The AsyncAPIColorLogo component is the logo for AsyncAPI in color mode.
 */
function AsyncAPIColorLogo({ alt = 'AsyncAPI Icon', className = '' }: AsyncAPIColorLogoProps) {
  const loaderIconPath: string = 'img/loaders/loader.png';

  return <img alt={alt} src={loaderIconPath} className={className || 'mx-auto w-16'} />;
}

export default AsyncAPIColorLogo;
