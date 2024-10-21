import React from 'react';

import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

import type { IButtonDefaultProps } from '../../types/components/buttons/types';
import IconYoutube from '../icons/YouTube';
import Button from './Button';

interface IYoutubeButtonProps extends IButtonDefaultProps {}

/**
 * @description The YoutubeButton component is a button that links to a YouTube video.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.href - The href attribute for the anchor tag.
 * @param {string} props.target - The target attribute for the anchor tag.
 * @param {ButtonIconPosition} props.iconPosition - The position of the icon in the button.
 * @param {string} props.className - The class name to be applied to the button.
 */
export default function YoutubeButton({
  text = 'Watch on YouTube',
  href,
  target = '_blank',
  iconPosition = ButtonIconPosition.LEFT,
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
