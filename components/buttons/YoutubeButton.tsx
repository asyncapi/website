import IconYoutube from '../icons/YouTube';
import Button from './Button';
import type { IButtonDefaultProps } from './types';

interface IYoutubeButtonProps extends IButtonDefaultProps {}

export default function YoutubeButton({
  text = 'Watch on YouTube',
  href,
  target = '_blank',
  iconPosition = 'left',
  className
}: IYoutubeButtonProps) {
  return (
    <Button
      text={text}
      icon={<IconYoutube className='-mt-1 inline-block size-6' />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`mt-2 block text-center text-gray-900 md:mt-0 md:inline-block ${className}`}
      bgClassName='bg-gray-200 hover:bg-gray-100'
    />
  );
}
