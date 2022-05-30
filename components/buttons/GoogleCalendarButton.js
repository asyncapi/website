import Button from './Button';
import IconGoogleCalendar from '../icons/GoogleCalendar';

export default function GoogleCalendarButton({
  text = 'Add to Google Calendar',
  href,
  target = '_blank',
  iconPosition = 'left',
  className,
}) {
  return (
    <Button
      text={text}
      icon={<IconGoogleCalendar />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`text-center block mt-2 md:mt-0 md:inline-block text-gray-900 ${className}`}
      bgClassName="bg-gray-200 hover:bg-gray-100"
    />
  )
}

