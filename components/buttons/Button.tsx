import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { ButtonIconPosition, ButtonSize, ButtonType } from '@/types/components/buttons/ButtonPropsType';

type IButtonProps = {
  text: string;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  target?: string;
  bgClassName?: string;
  textClassName?: string;
  buttonSize?: ButtonSize;
  type?: ButtonType;
} & (
  | ({
      href: string;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      href?: undefined | null;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

/**
 * @name Button
 * @param {string} props.text - The text to be displayed on the button.
 * @param {ButtonType} props.type - The type of the button. Defaults to 'button'.
 * @param {string} props.target - The target attribute for the anchor tag. Defaults to '_self'.
 * @param {React.ReactNode} props.icon - The icon to be displayed on the button.
 * @param {ButtonIconPosition} props.iconPosition - The position of the icon. Defaults to 'right'.
 * @param {string} props.className - The class name to be applied to the button.
 * @param {string} props.bgClassName - The class name to be applied to the button's background.
 * @param {string} props.textClassName - The class name to be applied to the button's text.
 * @param {ButtonSize} props.buttonSize - The size of the button. Defaults to 'default'.
 * @param {string} props.href - The href attribute for the anchor tag.
 * @description The Button component is a reusable button component that can be used to render a button or an anchor tag
 * @description The component accepts button or anchor tag props based on the presence of the href prop.
 * @description If the href prop is present, the component will render an anchor tag,
 * otherwise it will render a button tag.
 */
export default function Button({
  text,
  type = ButtonType.button,
  target = '_self',
  icon,
  iconPosition = ButtonIconPosition.right,
  className,
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
        className={buttonSize === ButtonSize.small ? smallButtonClasses : classNames}
        data-testid='Button-main'
      >
        {icon && iconPosition === ButtonIconPosition.left && (
          <span className='mr-2 inline-block' data-testid='Button-icon-left'>
            {icon}
          </span>
        )}
        <span className='inline-block'>{text}</span>
        {icon && iconPosition === ButtonIconPosition.right && (
          <span className='ml-2 inline-block' data-testid='Button-icon-right'>
            {icon}
          </span>
        )}
      </button>
    );
  }

  return (
    <Link
      passHref
      {...props}
      target={target}
      rel='noopener noreferrer'
      className={buttonSize === ButtonSize.small ? smallButtonClasses : classNames}
      data-testid='Button-link'
    >
      {icon && iconPosition === ButtonIconPosition.left && <span className='mr-2 inline-block'>{icon}</span>}
      <span className='inline-block'>{text}</span>
      {icon && iconPosition === ButtonIconPosition.right && <span className='ml-2 inline-block'>{icon}</span>}
    </Link>
  );
}
