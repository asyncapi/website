import Button from './Button'
import IconYoutube from '../icons/YouTube'

export default function YoutubeButton({
  text = 'Watch on YouTube',
  href,
  target = '_blank',
  iconPosition = 'left',
  className,
}) {
  return (
    <Button
      text={text}
      icon={<IconYoutube className="inline-block -mt-1 w-6 h-6" />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`text-center block mt-2 md:mt-0 md:inline-block text-gray-900 ${className}`}
      bgClassName="bg-gray-200 hover:bg-gray-100"
    />
  )
}

