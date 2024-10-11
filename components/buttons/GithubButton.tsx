import React from 'react';

import { ButtonIconPosition, ButtonSize } from '@/types/components/buttons/ButtonPropsType';

import type { IButtonDefaultProps } from '../../types/components/buttons/types';
import { useTranslation } from '../../utils/i18n';
import IconGithub from '../icons/Github';
import Button from './Button';

interface IGithubButtonProps extends IButtonDefaultProps {
  inNav?: boolean;
}

/**
 * @description The GithubButton component is a button that links to the AsyncAPI GitHub repository.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.href - The href attribute for the anchor tag.
 * @param {string} props.target - The target attribute for the anchor tag.
 * @param {ButtonIconPosition} props.iconPosition - The position of the icon in the button.
 * @param {string} props.className - The class name to be applied to the button.
 */
export default function GithubButton({
  text = 'githubButton',
  href = 'https://github.com/asyncapi',
  target = '_blank',
  iconPosition = ButtonIconPosition.LEFT,
  className = '',
  inNav
}: IGithubButtonProps) {
  const { t } = useTranslation('common');

  return (
    <Button
      text={t(text)}
      icon={<IconGithub className='-mt-1 inline-block size-6' />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={className}
      data-testid='Github-button'
      bgClassName='bg-gray-800 hover:bg-gray-700'
      buttonSize={inNav ? ButtonSize.SMALL : ButtonSize.DEFAULT}
    />
  );
}
