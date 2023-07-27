import Button from './Button';
import IconSlack from '../icons/Slack';

export default function SlackButton({
  text = 'Join on Slack',
  href = '/slack-invite',
  target = '_blank',
  iconPosition = 'left',
  className,
}) {
  return (
    <Button
      text={text}
      icon={<IconSlack className="inline-block p-0.5 -mt-1 w-6 h-6" />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={className}
      data-testid="Slack-button"
      bgClassName="bg-slack  hover:bg-slack-light"
    />
  );
}
