import Button from './Button';
import IconGoogleCalendar from '../icons/GoogleCalendar';
import { useTranslation } from '../../lib/i18n';

export default function GoogleCalendarButton({
  text = 'googleCalendarBtn',
  href,
  target = '_blank',
  iconPosition = 'left',
  className,
}) {

  const { t } = useTranslation('common'); 

  return (
    <Button
      text={t(text)}
      icon={<IconGoogleCalendar />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`text-center block mt-2 md:mt-0 md:inline-block text-gray-900 ${className}`}
      bgClassName="bg-gray-200 hover:bg-gray-100"
    />
  )
}

