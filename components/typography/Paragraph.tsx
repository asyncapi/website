interface ParagraphProps {
  typeStyle?: 'body-lg' | 'body-md' | 'body-sm';
  textColor?: string; 
  fontWeight?: string;
  className?: string;
  children?: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({
  typeStyle = 'body-lg',
  textColor = 'text-gray-700',
  fontWeight,
  className,
  children,
}) => {
  let classNames = '';

  switch (typeStyle) {
    case 'body-lg':
      classNames = `text-lg ${fontWeight ?? ''} ${className || ''}`;
      break;
    case 'body-md':
      classNames = `text-md ${fontWeight ?? ''} ${className || ''}`;
      break;
    case 'body-sm':
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
