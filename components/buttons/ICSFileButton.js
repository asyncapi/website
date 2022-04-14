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
      className={`text-center block mt-2 md:mt-0 md:inline-block border-primary-500 border text-primary-500 ${className}`}
      bgClassName="hover:bg-primary-400"
    />
  )
}

