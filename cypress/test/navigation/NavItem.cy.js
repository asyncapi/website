import NavItem from '../../../components/navigation/NavItem';
import MockRouter from '../../utils/router';

describe('NavItem', () => {
  it('renders a link without a dropdown', () => {
    cy.mount(
      <MockRouter >
        <NavItem text="Home" href="/" />
      </MockRouter>
    )
    cy.get('a').should('have.text', 'Home').and('have.attr', 'href', '/')
    cy.get('a').find('svg').should('not.exist')
  })

  it('renders a link with a dropdown', () => {
    cy.mount(
      <MockRouter >
        <NavItem text="Products" href="/products" hasDropdown />
      </MockRouter >)
    cy.get('a').should('have.text', 'Products').and('have.attr', 'href', '/products')
    cy.get('a').find('svg').should('exist')
  })

  it('renders a button with a dropdown', () => {
    cy.mount(
      <MockRouter >
        <NavItem text="More" hasDropdown />
      </MockRouter>
    )
    cy.get('button').should('have.text', 'More').and('have.attr', 'type', 'button')
    cy.get('button').find('svg').should('exist')
  })
})
