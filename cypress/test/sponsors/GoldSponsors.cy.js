import {mount} from 'cypress/react'
import GoldSponsors from '../../../components/sponsors/GoldSponsors';
import { goldSponsors } from '../../../components/sponsors/GoldSponsorsList';
describe('GoldSponsors Component', () => {
  beforeEach(() => {
    mount(<GoldSponsors />);
  });

  it('renders the gold sponsors', () => {
    cy.get('.flex-wrap')
      .find('[data-testid="GoldSponsors-link"]')
      .should('have.length', goldSponsors.length)
      .each(($sponsor, index) => {
        const sponsor = goldSponsors[index];
        cy.wrap($sponsor)
          .should('have.attr', 'href', sponsor.website)
          .find('[data-testid="GoldSponsors-img"]')
          .should('have.attr', 'src', sponsor.imageSrc)
          .should('have.attr', 'alt', sponsor.name);
      });
  });
});
