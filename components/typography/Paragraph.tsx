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
  let classNames = '';

  switch (typeStyle) {
    case ParagraphTypeStyle.lg:
      classNames = `text-lg ${fontWeight || ''} ${className || ''}`;
      break;
    case ParagraphTypeStyle.md:
      classNames = `text-md ${fontWeight || ''} ${className || ''}`;
      break;
    case ParagraphTypeStyle.sm:
      classNames = `text-sm ${fontWeight || ''} ${className || ''}`;
      break;
    default:
      classNames = `text-lg font-regular ${className || ''}`;
  }

  return (
    <p data-testid='Paragraph-test' className={twMerge(textColor, classNames)}>
      {children}
    </p>
  );
}
