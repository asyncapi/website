import type { HTMLAttributeAnchorTarget } from 'react';

export interface IButtonDefaultProps {
  text?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  iconPosition?: 'left' | 'right';
  className?: string;
}
