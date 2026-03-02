import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

export interface ParagraphProps {
  // eslint-disable-next-line prettier/prettier

  /** Contains the type of paragraph style. ParagraphTypeStyle.lg is by default */
  typeStyle?: ParagraphTypeStyle;

  /** Contains text color for the paragraph. 'text-gray-700' is by default */
  textColor?: string;

  /** Contains class name for applying font weight in the paragraph */
  fontWeight?: string;

  /** Contains additional classes that should be added to the component */
  className?: string;

  /** Contains all the child elements bounded inside component */
  children?: React.ReactNode;
}

/**
 * Paragraph component is used to render a paragraph element with different type of styles.
 */
export default function Paragraph({
  typeStyle = ParagraphTypeStyle.lg,
  textColor = 'text-gray-700',
  fontWeight = '',
  className = '',
  children
}: ParagraphProps) {
  let baseClassNames = '';

  switch (typeStyle) {
    case ParagraphTypeStyle.lg:
      baseClassNames = 'text-lg';
      break;
    case ParagraphTypeStyle.md:
      baseClassNames = 'text-md';
      break;
    case ParagraphTypeStyle.sm:
      baseClassNames = 'text-sm';
      break;
    default:
      baseClassNames = 'text-lg font-regular';
  }

  return (
    <p data-testid='Paragraph-test' className={twMerge(textColor, baseClassNames, fontWeight, className)}>
      {children}
    </p>
  );
}
