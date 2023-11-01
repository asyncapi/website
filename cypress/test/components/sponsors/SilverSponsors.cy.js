import { mount } from 'cypress/react';
import SilverSponsors from '../../../../components/sponsors/SilverSponsors';
import { Silversponsors } from '../../../../components/sponsors/SilverSponsorsList';

describe('SilverSponsors', () => {
  it('renders silver sponsors correctly', () => {
    mount(
      <SilverSponsors />
    );
    Silversponsors.forEach((sponsor, index) => {
      cy.get('[data-testid="SilverSponsors-link"]').eq(index)
        .should('have.attr', 'href', sponsor.url)
        .find('[data-testid="SilverSponsors-img"]')
        .should('have.attr', 'src', sponsor.image)
        .should('have.attr', 'alt', sponsor.name);
    });
  });
});
