import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ButtonIconPosition, ButtonSize, ButtonType } from '@/types/components/buttons/ButtonPropsType';

type IButtonProps = {
  // eslint-disable-next-line prettier/prettier

  /** The text to be displayed on the button. */
  text: string;

  /** The type of the button. Defaults to 'button'. */
  type?: ButtonType;

  /** The size of the button. Defaults to 'default'. */
  buttonSize?: ButtonSize;

  /** The class name to be applied to the button. */
  className?: string;

  /** The class name to be applied to the button's background. */
  bgClassName?: string;

  /** The class name to be applied to the button's text. */
  textClassName?: string;

  /** The icon to be displayed on the button. */
  icon?: React.ReactNode;

  /** The position of the icon. Defaults to 'right'. */
  iconPosition?: ButtonIconPosition;

  /** The target attribute for the anchor tag. Defaults to '_self'. */
  target?: string;
} & (
  | ({
      // eslint-disable-next-line prettier/prettier
      /** The href attribute for the anchor tag. */
      href: string;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      href?: undefined | null;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

/**
 * The Button component is a reusable button component that can be used to render a button or an anchor tag.
 * The component accepts button or anchor tag props based on the presence of the href prop.
 * If the href prop is present, the component will render an anchor tag,
 * otherwise it will render a button tag.
 */
export default function Button({
  text,
  type = ButtonType.BUTTON,
  target = '_self',
  icon,
  iconPosition = ButtonIconPosition.RIGHT,
  className = '',
  bgClassName = twMerge('bg-primary-500 hover:bg-primary-400'),
  textClassName = twMerge('text-white'),
  buttonSize,
  ...props
}: IButtonProps): React.ReactElement {
  const smallButtonClasses = twMerge(`${bgClassName} ${textClassName} transition-all duration-500
                            ease-in-out rounded-md px-3 py-2 text-sm font-medium tracking-heading ${className || ''}`);
  const classNames = twMerge(`${bgClassName} ${textClassName} transition-all duration-500 ease-in-out
                          rounded-md px-4 py-3 text-md font-semibold tracking-heading ${className || ''}`);

  if (!props.href) {
    return (
      <button
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        type={type}
        className={buttonSize === ButtonSize.SMALL ? smallButtonClasses : classNames}
        data-testid='Button-main'
      >
        {icon && iconPosition === ButtonIconPosition.LEFT && (
          <span className='mr-2 inline-block' data-testid='Button-icon-left'>
            {icon}
          </span>
        )}
        <span className='inline-block'>{text}</span>
        {icon && iconPosition === ButtonIconPosition.RIGHT && (
          <span className='ml-2 inline-block' data-testid='Button-icon-right'>
            {icon}
          </span>
        )}
      </button>
    );
  }

  return (
    <Link
      {...props}
      target={target}
      rel='noopener noreferrer'
      className={buttonSize === ButtonSize.SMALL ? smallButtonClasses : classNames}
      data-testid='Button-link'
    >
      {icon && iconPosition === ButtonIconPosition.LEFT && <span className='mr-2 inline-block'>{icon}</span>}
      <span className='inline-block'>{text}</span>
      {icon && iconPosition === ButtonIconPosition.RIGHT && <span className='ml-2 inline-block'>{icon}</span>}
    </Link>
  );
}
