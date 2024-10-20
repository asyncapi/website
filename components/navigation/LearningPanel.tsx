import React from 'react';

import { buckets } from '../data/buckets';
import FlyoutMenu from './FlyoutMenu';

/**
 * @description Component representing the learning panel.
 */
export default function LearningPanel() {
  return <FlyoutMenu items={buckets} />;
}
