import { mount } from 'cypress/react';
import React from 'react';
import AnnouncementHero from '../../../components/campaigns/AnnoucementHero';

describe('AnnouncementHero', () => {
  it('should render the banner when it should be shown', () => {
    mount(<AnnouncementHero />, { timeout: 10000 });

    cy.get('.bg-gray-50').should('be.visible').then(() => {
      cy.contains('AsyncAPI Conf on Tour 2023').should('be.visible');
      cy.contains('Madrid Edition').should('be.visible');
      cy.contains('October, 2023 | Madrid, Spain').should('be.visible');
      cy.contains('Submit a session').should('be.visible');
    });
  });

  it('should not render the banner when it should be hidden', () => {
    cy.window().then((window) => {
      window.shouldShowBanner = () => false;
    });

    mount(<AnnouncementHero />, { timeout: 10000 });

    cy.wrap(null).should(() => {
      expect('.bg-gray-50').to.not.exist;
      expect('AsyncAPI Conf on Tour 2023').to.not.exist;
      expect('Madrid Edition').to.not.exist;
      expect('October, 2023 | Madrid, Spain').to.not.exist;
      expect('Submit a session').to.not.exist;
    });
  });
});
