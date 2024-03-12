import { buckets } from '../data/buckets';
import FlyoutMenu from './FlyoutMenu';

export default function LearningPanel() {
  return (
    <FlyoutMenu items={buckets} />
  );
}
