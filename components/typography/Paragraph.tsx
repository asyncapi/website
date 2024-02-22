enum ParagraphTypeStyle {
  lg = 'body-lg',
  md = 'body-md',
  sm = 'body-sm',
}

interface ParagraphProps {
  typeStyle?: ParagraphTypeStyle;
  textColor?: string; 
  fontWeight?: string;
  className?: string;
  children?: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({
  typeStyle = ParagraphTypeStyle.lg,
  textColor = 'text-gray-700',
  fontWeight,
  className,
  children,
}) => {
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
    <p data-testid="Paragraph-test" className={`${textColor} ${classNames}`}>{children}</p>
  );
};

export default Paragraph;
