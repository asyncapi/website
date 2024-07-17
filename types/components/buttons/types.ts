import type { HTMLAttributeAnchorTarget } from 'react';

import type { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

export interface IButtonDefaultProps {
  text?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  iconPosition?: ButtonIconPosition;
  className?: string;
}
