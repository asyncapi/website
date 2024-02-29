import type { ParagraphProps } from "@/types/typography/Paragraph";
import { ParagraphTypeStyle } from "@/types/typography/Paragraph";
import { twMerge } from 'tailwind-merge';

export default function Paragraph({
  typeStyle = ParagraphTypeStyle.lg,
  textColor = 'text-gray-700',
  fontWeight,
  className,
  children,
}: ParagraphProps) {
  let classNames = '';

  switch (typeStyle) {
    case ParagraphTypeStyle.lg:
      classNames = `text-lg ${fontWeight ?? ''} ${className || ''}`;
      break;
    case ParagraphTypeStyle.md:
      classNames = `text-md ${fontWeight ?? ''} ${className || ''}`;
      break;
    case ParagraphTypeStyle.sm:
      classNames = `text-sm ${fontWeight ?? ''} ${className || ''}`;
      break;
    default:
      classNames = `text-lg font-regular ${className || ''}`;
  }

  return (
    <p data-testid="Paragraph-test" className={twMerge(textColor, classNames)}>{children}</p>
  );
}
