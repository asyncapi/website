import NavBar from '../../../components/navigation/NavBar'
import { mount } from '@cypress/react'
import MockRouter from '../../utils/router'

describe('Navbar Component', () => {
  it('renders Navbar Correctly', () => {
    mount(
        <MockRouter> 
           <NavBar /> 
        </MockRouter>
      )
      cy.get('[data-testid="Navbar-logo"]').should('exist')
      cy.get('[data-testid="Navbar-search"]').should('exist')
      cy.get('[data-testid="Navbar-main"]').should('exist')
      cy.get('[data-testid="Navbar-logo"]').should('have.attr','href','/')
  })
})