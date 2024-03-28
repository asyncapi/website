import { mount } from 'cypress/react';
import SponsorshipTiers from '../../../../components/FinancialSummary/SponsorshipTiers';

describe('SponsorshipTiers', () => {
  beforeEach(() => {
    mount(<SponsorshipTiers />);
  });

  it('renders the heading', () => {
    cy.get('h1').should('have.text', 'Sponsorship Tiers');
  });

  it('renders the sponsorship tiers table', () => {
    cy.get('table').should('be.visible');
  });

});
