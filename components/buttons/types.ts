import type { HTMLAttributeAnchorTarget } from 'react';
import { ButtonIconPositionType } from './Button';

export interface IButtonDefaultProps {
  text?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  iconPosition?: ButtonIconPositionType;
  className?: string;
}
