import React from 'react';

import { buckets } from '../data/buckets';
import FlyoutMenu from './FlyoutMenu';

interface LearningPanelProps {
  open?: boolean;
}

/**
 * @description Component representing the learning panel.
 */
export default function LearningPanel({ open = false }: LearningPanelProps) {
  return <FlyoutMenu items={buckets} open={open} />;
}
