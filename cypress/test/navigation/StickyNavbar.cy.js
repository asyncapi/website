import { mount } from 'cypress/react'
import StickyNavbar from '../../../components/navigation/StickyNavbar';
describe('StickyNavbar', () => {
    it('renders the navbar with children and custom class', () => {
        const customClass = 'custom-class';
        const childText = 'Navbar content';

        mount(<StickyNavbar className={ customClass }>{ childText }</StickyNavbar>);

        cy.get('[data-testid="Sticky-div"]').should('exist');
        cy.get('[data-testid="Sticky-div"]').should('have.class', 'top-0');
        cy.get('[data-testid="Sticky-div"]').should('have.class', 'bg-white');
        cy.get('[data-testid="Sticky-div"]').should('have.class', 'border-b');
        cy.get('[data-testid="Sticky-div"]').should('have.class', 'border-gray-300');
        cy.get('[data-testid="Sticky-div"]').should('have.class', 'z-50');
        cy.get('[data-testid="Sticky-div"]').should('have.class', customClass);
        cy.contains(childText); 
    });
});
