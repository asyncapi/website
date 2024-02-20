interface HeadingProps {
  typeStyle?: 
    | 'heading-xl'
    | 'heading-lg'
    | 'heading-md'
    | 'heading-md-semibold'
    | 'heading-sm'
    | 'heading-sm-semibold'
    | 'heading-xs'
    | 'heading-xs-semibold'
    | 'body-lg'
    | 'body-md'
    | 'body-sm';
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textColor?: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const Heading: React.FC<HeadingProps> = ({
  typeStyle = 'heading-lg',
  level = 'h2',
  textColor = 'text-primary-800',
  className,
  children,
  id,
}) => {
  let classNames = '';
  const Tag = level ?? 'h2';

  switch (typeStyle) {
    case 'heading-xl':
      classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-xl ${className || ''}`;
      break;
    case 'heading-lg':
      classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-lg ${className || ''}`;
      break;
    case 'heading-md':
      classNames = `font-heading text-heading-md font-bold tracking-heading ${className || ''}`;
      break;
    case 'heading-md-semibold':
      classNames = `font-heading text-heading-md font-semibold tracking-heading ${className || ''}`;
      break;
    case 'heading-sm':
      classNames = `font-heading text-heading-sm font-bold tracking-heading ${className || ''}`;
      break;
    case 'heading-sm-semibold':
      classNames = `font-heading text-heading-sm font-semibold tracking-heading ${className || ''}`;
      break;
    case 'heading-xs':
      classNames = `font-heading text-heading-xs font-bold tracking-heading ${className || ''}`;
      break;
    case 'heading-xs-semibold':
      classNames = `font-heading text-heading-xs font-semibold tracking-heading ${className || ''}`;
      break;
    case 'body-lg':
      classNames = `font-heading text-body-lg tracking-body font-regular ${className || ''}`;
      break;
    case 'body-md':
      classNames = `font-heading text-body-md tracking-body font-regular ${className || ''}`;
      break;
    case 'body-sm':
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
