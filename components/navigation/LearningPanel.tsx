import FlyoutMenu from './FlyoutMenu'
import { buckets } from '../data/buckets'

export default function LearningPanel () {
  return (
    <FlyoutMenu items={buckets} />
  )
}