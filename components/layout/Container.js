export default function Container({
  children,
  fluid = false,
  flex = false,
  wide = false,
  padding = 'px-4 sm:px-6 lg:px-8',
  flexReverse = false,
  cssBreakingPoint = 'md',
  className = '',
  as,
}) {
  const commonClassNames = `${
    flex ? `${cssBreakingPoint === 'lg' ? 'lg:flex' : 'md:flex'}` : 'block'
  } ${
    flexReverse
      ? `${
          cssBreakingPoint === 'lg'
            ? 'lg:flex-row-reverse'
            : 'md:flex-row-reverse'
        }`
      : ''
  } ${className} ${padding}`;
  const wideClassNames = `max-w-screen-xl ${commonClassNames}`;
  const regularClassNames = `max-w-4xl ${commonClassNames}`;
  const normalClassNames = `${
    wide ? wideClassNames : regularClassNames
  } mx-auto w-full`;
  const fluidClassNames = `${commonClassNames}`;

  const Tag = as || 'div';

  return (
    <Tag
      className={fluid ? fluidClassNames : normalClassNames}
      data-testid="Container-main"
    >
      {children}
    </Tag>
  );
}
