enum HeadingTypeStyle {
  xl = 'heading-xl',
  lg = 'heading-lg',
  md = 'heading-md',
  md_semibold = 'heading-md-semibold',
  sm = 'heading-sm',
  sm_semibold = 'heading-sm-semibold',
  xs = 'heading-xs',
  xs_semibold = 'heading-xs-semibold',
  body_lg = 'body-lg',
  body_md = 'body-md',
  body_sm = 'body-sm',
}

enum HeadingLevel {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

interface HeadingProps {
  typeStyle?: HeadingTypeStyle;
  level?: HeadingLevel;
  textColor?: string;
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

const Heading: React.FC<HeadingProps> = ({
  typeStyle = HeadingTypeStyle.lg,
  level = HeadingLevel.h2,
  textColor = 'text-primary-800',
  className,
  children,
  id,
}) => {
  let classNames = '';
  const Tag = level ?? HeadingLevel.h2;

  switch (typeStyle) {
    case HeadingTypeStyle.xl:
      classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-xl ${className || ''}`;
      break;
    case HeadingTypeStyle.lg:
      classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-lg ${className || ''}`;
      break;
    case HeadingTypeStyle.md:
      classNames = `font-heading text-heading-md font-bold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.md_semibold:
      classNames = `font-heading text-heading-md font-semibold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.sm:
      classNames = `font-heading text-heading-sm font-bold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.sm_semibold:
      classNames = `font-heading text-heading-sm font-semibold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.xs:
      classNames = `font-heading text-heading-xs font-bold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.xs_semibold:
      classNames = `font-heading text-heading-xs font-semibold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.body_lg:
      classNames = `font-heading text-body-lg tracking-body font-regular ${className || ''}`;
      break;
    case HeadingTypeStyle.body_md:
      classNames = `font-heading text-body-md tracking-body font-regular ${className || ''}`;
      break;
    case HeadingTypeStyle.body_sm:
      classNames = `font-heading text-body-lg tracking-body font-regular ${className || ''}`;
      break;
    default:
      classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-xl ${className || ''}`;
  }

  return (
    <Tag className={`${textColor} ${classNames}`} id={id}>
      {children}
    </Tag>
  );
};

export default Heading;
