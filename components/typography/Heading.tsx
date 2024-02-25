import { HeadingLevel } from "@/types/HeadingLevel";
import { HeadingTypeStyle } from "@/types/HeadingTypeStyle";

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
    case HeadingTypeStyle.mdSemibold:
      classNames = `font-heading text-heading-md font-semibold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.sm:
      classNames = `font-heading text-heading-sm font-bold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.smSemibold:
      classNames = `font-heading text-heading-sm font-semibold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.xs:
      classNames = `font-heading text-heading-xs font-bold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.xsSemibold:
      classNames = `font-heading text-heading-xs font-semibold tracking-heading ${className || ''}`;
      break;
    case HeadingTypeStyle.bodyLg:
      classNames = `font-heading text-body-lg tracking-body font-regular ${className || ''}`;
      break;
    case HeadingTypeStyle.bodyLg:
      classNames = `font-heading text-body-md tracking-body font-regular ${className || ''}`;
      break;
    case HeadingTypeStyle.bodySm:
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
