import React from 'react';
import { mount } from 'cypress/react';
import Features from '../../../components/features/index';
import { features } from '../../../components/features/FeatureList';
describe('Features Component', () => {
  it('renders all features with their names, descriptions, and links', () => {
    mount(<Features />);
    
    //check number of features rendered is equal to features array
    cy.get('[data-testid="Feature-ul"] [data-testid="Feature-li"]').should('have.length', features.length); // there are 6 features in the list
       
    features.forEach((feature, index) => {
      cy.get('[data-testid="Feature-ul"] [data-testid="Feature-li"]').eq(index).as('feature');

      cy.get('@feature').within(() => {
        cy.get('h3').should('have.text', `features.${feature.id}.name`);
        cy.get('p').should('have.text', `features.${feature.id}.description`);

        feature.links.forEach((link, linkIndex) => {
            cy.get('a').eq(linkIndex).should('have.attr', 'href').then((hrefValue) => {
              const formattedHrefValue = hrefValue.replace(/^\//, '');   // remove this / so that the value is equal to link.href
              expect(formattedHrefValue).to.equal(link.href);
            });
          });
          
      });
    });
  });
});
