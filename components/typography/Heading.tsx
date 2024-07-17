import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

export interface HeadingProps {
  // eslint-disable-next-line prettier/prettier

  /** Contains the type of heading style. HeadingTypeStyle.lg is default */
  typeStyle?: HeadingTypeStyle;

  /** Contains the level of heading. HeadingLevel.h2 is by default */
  level?: HeadingLevel;

  /** Contains text color for the heading. 'text-primary-800' is by default */
  textColor?: string;

  /** Contains additional classes that should be added to the component */
  className?: string;

  /** Contains all the child elements bounded inside component */
  children?: React.ReactNode;

  /** Contains an id to be appended on heading */
  id?: string;
}

/**
 * Heading component is used to render a heading element with different styles and sizes.
 */
export default function Heading({
  typeStyle = HeadingTypeStyle.lg,
  level = HeadingLevel.h2,
  textColor = 'text-primary-800',
  className = '',
  children,
  id
}: HeadingProps) {
  const Tag = level ?? HeadingLevel.h2;

  let classNames = '';

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
    case HeadingTypeStyle.bodyMd:
      classNames = `font-heading text-body-md tracking-body font-regular ${className || ''}`;
      break;
    case HeadingTypeStyle.bodySm:
      classNames = `font-heading text-body-sm tracking-body font-regular ${className || ''}`;
      break;
    default:
      classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-xl ${className || ''}`;
  }

  return (
    <Tag id={id} className={`${textColor} ${classNames}`}>
      {children}
    </Tag>
  );
}
