import React from 'react';
import { mount } from 'cypress/react';
import Profile from '../../../components/Profile';
describe('Profile Component', () => {
  it('renders null when profiles array is empty', () => {
    const props = {
      profiles: [],
      className: 'my-profiles',
    };
    mount(<Profile {...props} />);
    cy.get('[data-testid="Profiles-div"]').should('not.exist');
  });
  
 it('renders profile links and names when profiles array is not empty', () => {
    const profiles = [
      {
        name: 'Alejandra Quetzalli',
        avatar: 'https://avatars.githubusercontent.com/alequetzalli',
        link: 'https://github.com/alequetzalli'
      },
      {
        name: 'Azeez Elegbede',
        avatar: 'https://avatars.githubusercontent.com/acethecreator',
        link: 'https://github.com/acethecreator'
      }
    ];
    const props = {
      profiles,
      className: 'my-profiles',
    };
    mount(<Profile {...props} />);
   cy.get('[data-testid="Profiles-main"]').find('[data-testid="Profiles-link"]').should('have.length', profiles.length)
      .each(($profileLink, index) => {
        const profile = profiles[index];
        cy.wrap($profileLink)
          .should('have.attr', 'href', profile.link)
          .find('img')
          .should('have.attr', 'src', profile.avatar)
          .should('have.attr', 'alt', profile.name)
          .siblings('.text-sm')
          .should('have.text', profile.name);
      });
  });
});
