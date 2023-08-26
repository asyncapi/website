import Flyout from '../../../components/navigation/FlyoutMenu'
import { buckets } from '../../../components/data/buckets'

describe('Flyout component', () => {
  it('renders correctly', () => {
    // mount the Flyout component with the mock items as props
    cy.mount(<Flyout items={buckets} />)
  })
})
