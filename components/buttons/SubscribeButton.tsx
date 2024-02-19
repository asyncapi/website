import Button from './Button';
import IconSubscribe from '../icons/Subscribe';
// import { useTranslation } from '../../lib/i18n';
import { IButtonDefaultProps } from './types';

interface IGoogleCalendarButtonProps extends IButtonDefaultProps {}

export default function GoogleCalendarButton({
  text = 'subscribeBtn',
  href,
  target = '_blank',
  iconPosition = 'left',
  className,
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
      className={`text-center block mt-2 md:mt-0 md:inline-block text-gray-900 ${className}`}
      bgClassName="bg-gray-200 hover:bg-gray-100"
    />
  )
}

