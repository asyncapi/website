import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';

import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

import type { IButtonDefaultProps } from '../../types/components/buttons/types';
import { useTranslation } from '../../utils/i18n';
import Button from './Button';

interface IICSFButtonProps extends IButtonDefaultProps {}

/**
 * @description The ICSFButton component is a button that links to an ICS file.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.href - The href attribute for the anchor tag.
 * @param {string} props.target - The target attribute for the anchor tag.
 * @param {ButtonIconPosition} props.iconPosition - The position of the icon in the button.
 * @param {string} props.className - The class name to be applied to the button.
 */
export default function ICSFButton({
  text = 'icsFileBtn',
  href,
  target = '_blank',
  iconPosition = ButtonIconPosition.RIGHT,
  className
}: IICSFButtonProps) {
  const { t } = useTranslation('common');

  return (
    <Button
      text={t(text)}
      icon={<PlusIcon className='-mb-1 size-5' />}
      href={href}
      iconPosition={iconPosition}
      target={target}
      className={`mt-2 block text-center border-2 border-sky-300 text-sky-400 md:mt-0 md:inline-block ${className}`}
      bgClassName=' hover:bg-sky-100'
    />
  );
}
