import React from 'react';
import { twMerge } from 'tailwind-merge';

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

  let baseClassNames = '';

  switch (typeStyle) {
    case HeadingTypeStyle.xl:
      baseClassNames = 'font-heading text-heading-md font-bold tracking-heading md:text-heading-xl';
      break;
    case HeadingTypeStyle.lg:
      baseClassNames = 'font-heading text-heading-md font-bold tracking-heading md:text-heading-lg';
      break;
    case HeadingTypeStyle.md:
      baseClassNames = 'font-heading text-heading-md font-bold tracking-heading';
      break;
    case HeadingTypeStyle.mdSemibold:
      baseClassNames = 'font-heading text-heading-md font-semibold tracking-heading';
      break;
    case HeadingTypeStyle.sm:
      baseClassNames = 'font-heading text-heading-sm font-bold tracking-heading';
      break;
    case HeadingTypeStyle.smSemibold:
      baseClassNames = 'font-heading text-heading-sm font-semibold tracking-heading';
      break;
    case HeadingTypeStyle.xs:
      baseClassNames = 'font-heading text-heading-xs font-bold tracking-heading';
      break;
    case HeadingTypeStyle.xsSemibold:
      baseClassNames = 'font-heading text-heading-xs font-semibold tracking-heading';
      break;
    case HeadingTypeStyle.bodyLg:
      baseClassNames = 'font-heading text-body-lg tracking-body font-regular';
      break;
    case HeadingTypeStyle.bodyMd:
      baseClassNames = 'font-heading text-body-md tracking-body font-regular';
      break;
    case HeadingTypeStyle.bodySm:
      baseClassNames = 'font-heading text-body-sm tracking-body font-regular';
      break;
    default:
      baseClassNames = 'font-heading text-heading-md font-bold tracking-heading md:text-heading-xl';
  }

  return (
    <Tag id={id} className={twMerge(textColor, baseClassNames, className)}>
      {children}
    </Tag>
  );
}
