import React from 'react';

import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

import type { IButtonDefaultProps } from '../../types/components/buttons/types';
import { useTranslation } from '../../utils/i18n';
import IconSubscribe from '../icons/Subscribe';
import Button from './Button';

interface IGoogleCalendarButtonProps extends IButtonDefaultProps {}

/**
 * @description The GoogleCalendarButton component is a button that links to the Google Calendar.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.href - The href attribute for the anchor tag.
 * @param {string} props.target - The target attribute for the anchor tag.
 * @param {ButtonIconPosition} props.iconPosition - The position of the icon in the button.
 * @param {string} props.className - The class name to be applied to the button.
 */
export default function GoogleCalendarButton({
  text = 'subscribeBtn',
  href,
  target = '_blank',
  iconPosition = ButtonIconPosition.LEFT,
  className
}: IGoogleCalendarButtonProps) {
  const { t } = useTranslation('common');

  return (
    <Button
      text={t(text)}
      icon={<IconSubscribe />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`mt-2 block text-center text-gray-900 md:mt-0 md:inline-block ${className}`}
      bgClassName='bg-gray-200 hover:bg-gray-100'
    />
  );
}
