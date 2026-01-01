import React from 'react';

import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

import type { IButtonDefaultProps } from '../../types/components/buttons/types';
import IconSlack from '../icons/Slack';
import Button from './Button';

interface ISlackButtonProps extends IButtonDefaultProps {}

/**
 * SlackButton component always opens AsyncAPI Slack invite in a new tab.
 */
export default function SlackButton({ text = 'Join on Slack', className = '' }: ISlackButtonProps) {
  const href = 'https://www.asyncapi.com/slack-invite';

  return (
    <Button
      as='a'
      href={href}
      text={text}
      icon={<IconSlack className='-mt-1 inline-block size-6 p-0.5' />}
      iconPosition={ButtonIconPosition.LEFT}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
      data-testid='Slack-button'
      bgClassName='bg-slack hover:bg-slack-light'
    />
  );
}
