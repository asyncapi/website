import Button from './Button';
import IconSubscribe from '../icons/Subscribe';

export default function GoogleCalendarButton({
  text = 'Subscribe',
  href,
  target = '_blank',
  iconPosition = 'left',
  className,
}) {
  return (
    <Button
      text={text}
      icon={<IconSubscribe />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`text-center block mt-2 md:mt-0 md:inline-block border-indigo-700 border text-indigo-700 ${className}`}
      bgClassName="hover:bg-indigo-900"
    />
  )
}

