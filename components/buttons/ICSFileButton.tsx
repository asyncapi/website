import IconCalendar from '../icons/Calendar';
import Button from './Button';
import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';
// TODO: add this again when we have i18n
// import { useTranslation } from '../../lib/i18n';
import type { IButtonDefaultProps } from './types';

interface IICSFButtonProps extends IButtonDefaultProps {}

/**
 * @description The ICSFButton component is a button that links to an ICS file.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.href - The href attribute for the anchor tag.
 * @param {string} props.target - The target attribute for the anchor tag.
 * @param {ButtonIconPosition} props.iconPosition - The position of the icon in the button.
 * @param {string} props.className - The class name to be applied to the button.
 */
export default function ICSFButton({
  text = 'icsFileBtn',
  href,
  target = '_blank',
  iconPosition = ButtonIconPosition.left,
  className
}: IICSFButtonProps) {
  // TODO: add this again when we have i18n
  // const { t } = useTranslation('common');

  return (
    <Button
      // TODO: add this again when we have i18n
      // text={t(text)}
      text={text}
      icon={<IconCalendar />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`mt-2 block text-center text-gray-900 md:mt-0 md:inline-block ${className}`}
      bgClassName='bg-gray-200 hover:bg-gray-100'
    />
  );
}
