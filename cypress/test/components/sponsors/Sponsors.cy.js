import { mount } from 'cypress/react';
import Sponsors from '../../../../components/sponsors/Sponsors';
import { sponsors } from '../../../../components/sponsors/SponsorsList';

describe('Sponsors Component', () => {
  it('renders sponsors correctly', () => {
    mount(<Sponsors sponsors={sponsors} />);
    
    sponsors.forEach((sponsor, index) => {
      cy.get('[data-testid="Sponsors-list"]').eq(index).within(() => {
        cy.get('[data-testid="Sponsors-link"]')
          .should('have.attr', 'href', sponsor.link)
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener noreferrer');

        cy.get('[data-testid="Sponsors-img"]')
          .should('have.attr', 'src', sponsor.imageSrc)
          .should('have.attr', 'alt', sponsor.altText);
      });
    });
  });
  it('shows support banner when showSupportBanner prop is true', () => {
    mount(<Sponsors sponsors={sponsors} showSupportBanner={true} />);
    cy.contains('Want to become a sponsor?');
    cy.contains('Support us!')
      .should('have.attr', 'href', 'https://opencollective.com/asyncapi')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');
  });

  it('does not show support banner when showSupportBanner prop is false', () => {
    mount(<Sponsors sponsors={sponsors} showSupportBanner={false} />);
    cy.contains('Want to become a sponsor?').should('not.exist');
    cy.contains('Support us!').should('not.exist');
  });
});
