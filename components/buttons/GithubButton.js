import Button from './Button'
import IconGithub from '../icons/Github'
import { useTranslation } from '../../lib/i18n'

export default function GithubButton({
  text = 'githubButton',
  href = 'https://github.com/asyncapi',
  target = '_blank',
  iconPosition = 'left',
  className,
  inNav = "false"
}) {

  const { t } = useTranslation("common");

  return (
    <Button
      text={t(text)}
      icon={<IconGithub className="inline-block -mt-1 w-6 h-6" />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={className}
      data-testid="Github-button"
      bgClassName="bg-gray-800 hover:bg-gray-700"
      buttonSize={ inNav == "true" ? "small" : "default" }
    />
  )
}

