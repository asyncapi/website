import { twMerge } from 'tailwind-merge';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

export interface ParagraphProps {
  typeStyle?: ParagraphTypeStyle;
  textColor?: string;
  fontWeight?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Paragraph
 * @param {ParagraphTypeStyle} props.typeStyle contains the type of paragraph style. ParagraphTypeStyle.lg is by default
 * @param {string} props.textColor contains text color for the paragraph. 'text-gray-700' is by default
 * @param {string} props.fontWeight contains class name for applying font weight in the paragraph
 * @param {string} props.className contains additional classes that should be added to the component
 * @param {React.ReactNode} props.children contains all the child elements bounded inside component
 */
export default function Paragraph({
  typeStyle = ParagraphTypeStyle.lg,
  textColor = 'text-gray-700',
  fontWeight = '',
  className = '',
  children,
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
    <p data-testid="Paragraph-test" className={twMerge(textColor, classNames)}>
      {children}
    </p>
  );
}
