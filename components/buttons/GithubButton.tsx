import Button from './Button'
import IconGithub from '../icons/Github'
import { HTMLAttributeAnchorTarget } from 'react';
// TODO: add this again when we have i18n
// import { useTranslation } from '../../lib/i18n'

interface IGithubButtonProps {
  text?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  iconPosition?: "left" | "right";
  className?: string;
  inNav?: boolean;
}

export default function GithubButton({
  text = 'githubButton',
  href = 'https://github.com/asyncapi',
  target = '_blank',
  iconPosition = 'left',
  className,
  inNav
}: IGithubButtonProps) {

  // TODO: add this again when we have i18n
  // const { t } = useTranslation("common");

  return (
    <Button
      // TODO: add this again when we have i18n
      // text={t(text)}
      text={text}
      icon={<IconGithub className="inline-block -mt-1 w-6 h-6" />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={className}
      data-testid="Github-button"
      bgClassName="bg-gray-800 hover:bg-gray-700"
      buttonSize={ inNav ? "small" : "default" }
    />
  )
}

