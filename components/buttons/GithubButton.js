import Button from './Button'
import IconGithub from '../icons/Github'

export default function GithubButton({
  text = 'View on Github',
  href = 'https://github.com/asyncapi',
  target = '_blank',
  iconPosition = 'left',
  className,
}) {
  return (
    <Button
      text={text}
      icon={<IconGithub className="inline-block -mt-1 w-6 h-6" />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={className}
      bgClassName="bg-gray-800 hover:bg-gray-600"
    />
  )
}

