import IconSlack from '../icons/Slack';
import Button from './Button';
import type { IButtonDefaultProps } from './types';

interface ISlackButtonProps extends IButtonDefaultProps {}

export default function SlackButton({
  text = 'Join on Slack',
  href = '/slack-invite',
  target = '_blank',
  iconPosition = 'left',
  className
}: ISlackButtonProps) {
  return (
    <Button
      text={text}
      icon={<IconSlack className='-mt-1 inline-block size-6 p-0.5' />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={className}
      data-testid='Slack-button'
      bgClassName='bg-slack  hover:bg-slack-light'
    />
  );
}
