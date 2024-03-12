import type { HTMLAttributeAnchorTarget } from 'react';

import type { ButtonIconPositionType } from './Button';

export interface IButtonDefaultProps {
  text?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  iconPosition?: ButtonIconPositionType;
  className?: string;
}
