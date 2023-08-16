import NavBar from '../../../components/navigation/NavBar'
import { mount } from '@cypress/react'
import MockRouter from '../../utils/router'

describe('Navbar Component', () => {
  it('renders Navbar Correctly', () => {
    mount(
        <MockRouter>  <NavBar /> </MockRouter>
      )
  })


})