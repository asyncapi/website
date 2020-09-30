import FlyoutMenu from './FlyoutMenu'
import learningItems from './learningItems'

export default function LearningPanel () {
  return (
    <FlyoutMenu items={learningItems} />
  )
}