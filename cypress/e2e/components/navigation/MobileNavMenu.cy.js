import { mount } from 'cypress/react'
import MockRouter from '../../../utils/router'
import MobileNavMenu from '../../../../components/navigation/MobileNavMenu';
describe('MobileNavMenu', () => {
    it('renders the Mobile Nav Menu', () => {
        mount(
        
        <MockRouter>
         <MobileNavMenu/>
        </MockRouter>);
        cy.get('[data-testid="MobileNav-Logo"]').should('exist')
        cy.get('[data-testid="MobileNav-button"]').should('exist')
        cy.get('[data-testid="MobileNav-docs"]').should('exist')
        cy.get('[data-testid="MobileNav-tools"]').should('exist')
        cy.get('[data-testid="MobileNav-others"]').should('exist')
    });
});
