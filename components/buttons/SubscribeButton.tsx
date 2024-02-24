import IconSubscribe from '../icons/Subscribe';
import Button from './Button';
// import { useTranslation } from '../../lib/i18n';
import type { IButtonDefaultProps } from './types';

interface IGoogleCalendarButtonProps extends IButtonDefaultProps {}

export default function GoogleCalendarButton({
  text = 'subscribeBtn',
  href,
  target = '_blank',
  iconPosition = 'left',
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
