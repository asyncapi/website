import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { TextLinkProps } from '@/types/typography/TextLink';

export default function TextLink({
  href,
  className,
  target,
  children,
  id
}: TextLinkProps) {
  const classNames = twMerge(`text-secondary-500 underline hover:text-gray-800 font-medium transition ease-in-out duration-300 ${className || ''}`);

  return (
    <Link 
      href={href} 
      target={target} 
      rel="noreferrer noopener" 
      className={classNames}
      id={id}
      data-testid="TextLink-href"
    >
      <span className={classNames}>
        {children}
      </span>
    </Link>
  );
}
