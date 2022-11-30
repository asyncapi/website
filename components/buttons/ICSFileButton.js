import Button from './Button';
import IconCalendar from '../icons/Calendar';

export default function GoogleCalendarButton({
  text = 'Download ICS File',
  href,
  target = '_blank',
  iconPosition = 'left',
  className,
}) {
  return (
    <Button
      text={text}
      icon={<IconCalendar />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`text-center block mt-2 md:mt-0 md:inline-block text-gray-900 ${className}`}
      bgClassName="bg-gray-200 hover:bg-gray-100"
    />
  )
}

