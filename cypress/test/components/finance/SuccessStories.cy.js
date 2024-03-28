import { mount } from 'cypress/react';
import SuccessStories from '../../../../components/FinancialSummary/SuccessStories';

describe('SuccessStories Component', () => {
    beforeEach(() => {
        mount(<SuccessStories/>)
    });

    it('should display Success Stories section with content', () => {
        cy.get('#success-stories').should('exist');

        cy.contains('Community Manager').should('exist');
        cy.contains('AsyncAPI Mentorship').should('exist');
        cy.contains('AsyncAPI Conference').should('exist');
    });

    it('should have correct external links', () => {
        cy.get('a[href="https://github.com/orgs/asyncapi/discussions/948"]').should('have.attr', 'target', '_blank');
        cy.get('a[href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl"]').should('have.attr', 'target', '_blank');
        cy.get('a[href="https://conference.asyncapi.com"]').should('have.attr', 'target', '_blank');
    });
    
});
