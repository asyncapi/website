import { twMerge } from 'tailwind-merge';

interface TextLinkProps {
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
  id?: string;
}

const TextLink: React.FC<TextLinkProps> = ({
  href,
  className,
  target,
  children,
  id
}) => {
  const classNames = twMerge(`text-secondary-500 underline hover:text-gray-800 font-medium transition ease-in-out duration-300 ${className || ''}`);

  return (
    <a 
      href={href} 
      target={target} 
      rel="noreferrer noopener" 
      className={classNames}
      id={id}
      data-testid="TextLink-href"
    >
      {children}
    </a>
  );
};

export default TextLink;
