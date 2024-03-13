import type { HTMLAttributeAnchorTarget } from 'react';

import type { ButtonIconPosition } from './Button';

export interface IButtonDefaultProps {
  text?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  iconPosition?: ButtonIconPosition;
  className?: string;
}
