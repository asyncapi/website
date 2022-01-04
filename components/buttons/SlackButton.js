import Button from './Button';
import IconSlack from '../icons/Slack';

export default function SlackButton({
  text = 'Join on Slack',
  href,
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
      bgClassName="bg-slack  hover:bg-slack-light"
    />
  );
}
