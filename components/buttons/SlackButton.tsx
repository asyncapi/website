import React from 'react';

import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

import type { IButtonDefaultProps } from '../../types/components/buttons/types';
import IconSlack from '../icons/Slack';
import Button from './Button';

interface ISlackButtonProps extends IButtonDefaultProps {}

/**
 * @description The SlackButton component is a button that links to the AsyncAPI Slack channel.
 */
export default function SlackButton({
  text = 'Join on Slack',
  href = 'https://www.asyncapi.com/slack-invite',
  target = '_blank',
  iconPosition = ButtonIconPosition.LEFT,
  className = ''
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
      bgClassName='bg-slack hover:bg-slack-light'
    />
  );
}
