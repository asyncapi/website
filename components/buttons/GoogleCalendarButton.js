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
      className={`text-center block mt-2 md:mt-0 md:inline-block border-primary-500 border text-primary-500 ${className}`}
      bgClassName="hover:bg-primary-400"
    />
  )
}

