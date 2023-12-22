import { mount } from 'cypress/react';
import AsyncAPISummary from "../../../../components/FinancialSummary/AsyncAPISummary";

describe('AsyncAPISummary Component', () => {
    beforeEach(() => {
      mount(<AsyncAPISummary/>);
    });
  
    it('navigates to Open Collective when "Become a Sponsor" button is clicked', () => {
        cy.contains('Become a Sponsor')
        .should('have.attr', 'href', 'https://opencollective.com/asyncapi#category-CONTRIBUTE')
        .and('have.attr', 'target', '_blank');
    });
  
    it('displays donation options with correct links', () => {
      cy.get('[data-testid="open-collective-link"]').should('have.attr', 'href', 'https://opencollective.com/asyncapi');
      cy.get('[data-testid="lfx-link"]').should('have.attr', 'href', 'https://crowdfunding.lfx.linuxfoundation.org/projects/445898e9-42a2-4965-9e0a-c2a714f381bc');
      cy.get('[data-testid="github-sponsors-link"]').should('have.attr', 'href', 'https://github.com/sponsors/asyncapi');
    });
  });
  