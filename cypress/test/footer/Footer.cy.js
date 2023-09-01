import { mount } from '@cypress/react'
import Footer from '../../../components/footer/Footer'
import { socialMediaLinks, initiativeLinks } from '../../../components/footer/FooterList'

describe('Footer component', () => {
  beforeEach(() => {
    mount(<Footer />)
  })

  it('renders initiative links', () => {
    cy.get('[data-testid=Footer-initiative-links] a').should('have.length', initiativeLinks.length)
  })

  it('displays correct initiative link labels and URLs', () => {
    cy.get('[data-testid=Footer-initiative-links] a').each(($link, index) => {
      const { label, url } = initiativeLinks[index]
      expect($link).to.have.text(label)
      expect($link).to.have.attr('href', url)
    })
  })

  it('renders social media links', () => {
    cy.get('[data-testid=Footer-social-media-links] a').should('have.length', socialMediaLinks.length)
  })

  it('displays correct social media link', () => {
    cy.get('[data-testid=Footer-social-media-links] a').each(($link, index) => {
      const { url } = socialMediaLinks[index]
      expect($link).to.have.attr('href', url)

    })
  })
  it('displays the end content', () => {
    cy.get('[data-testid="Footer-content"]').should('be.visible')
  })

  it('checks for logo and link associated with it', () => {
    cy.get('[data-testid="Footer-logo-link"]').should('exist')
    cy.get('[data-testid="Footer-logo-link"]').should('have.attr', 'href', '/')

  })
})
