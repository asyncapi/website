import IconSubscribe from '../icons/Subscribe';
import Button from './Button';
import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

// import { useTranslation } from '../../lib/i18n';
import type { IButtonDefaultProps } from './types';

interface IGoogleCalendarButtonProps extends IButtonDefaultProps {}

/**
 * @description The GoogleCalendarButton component is a button that links to the Google Calendar.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.href - The href attribute for the anchor tag.
 * @param {string} props.target - The target attribute for the anchor tag.
 * @param {ButtonIconPosition} props.iconPosition - The position of the icon in the button.
 * @param {string} props.className - The class name to be applied to the button.
 */
export default function GoogleCalendarButton({
  text = 'subscribeBtn',
  href,
  target = '_blank',
  iconPosition = ButtonIconPosition.left,
  className
}: IGoogleCalendarButtonProps) {
  // const { t } = useTranslation('common');

  return (
    <Button
      // TODO: add this again when we have i18n
      // text={t(text)}
      text={text}
      icon={<IconSubscribe />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`mt-2 block text-center text-gray-900 md:mt-0 md:inline-block ${className}`}
      bgClassName='bg-gray-200 hover:bg-gray-100'
    />
  );
}
