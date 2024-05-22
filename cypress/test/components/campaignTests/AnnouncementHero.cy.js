import React from 'react';
import { mount } from '@cypress/react';
import AnnouncementHero from '../../../../components/campaigns/AnnouncementHero';
beforeEach(() => {
  const mockDate = new Date('2023-05-01T00:00:00Z');
  cy.clock(mockDate.getTime());
  mount(<AnnouncementHero />);
});

// .skip should be removed once the AnnouncementHero component is rendered in the website
describe('AnnouncementHero Component', () => {
  it.skip('should render the component when the date is within the valid range', () => {
    const mockDate = new Date(2021, 10, 12).getTime();
    cy.clock(mockDate);
    cy.get('[data-testid="AnnouncementHero-main-div"]').should('exist');
  });

  //check if announcement rendered is small or large .
  it.skip('should render a small announcement when "small" prop is true', () => {
    mount(<AnnouncementHero small />);
    cy.get('[data-testid="AnnouncementHero-main-div"]').should('have.class', 'mb-4');
  });

  it.skip('should display the correct event information', () => {
    // Assert the event details
    cy.get('[data-testid="Paragraph-test"]').should('exist');
    cy.get('h2').should('exist');

  });

  it.skip('should have a link and text for the button', () => {
    mount(<AnnouncementHero />);
    cy.get('[data-testid="Button-link"]')
      .should('have.attr', 'target', '_blank')
      //making sure link starts with https://
      .should('have.attr', 'href').and('match', /^https:\/\//)
    cy.get('[data-testid="Button-link"]')
      .find('span') // Find the <span> element inside the <a>
      .and('not.be.empty');
   });

  //check if announcement rendered is small or large .
  it.skip('should render a small announcement when "small" prop is true', () => {
    const mockDate = new Date('2023-05-01T00:00:00Z');
    cy.clock(mockDate.getTime());

    mount(<AnnouncementHero small />);

    cy.get('[data-testid="AnnouncementHero-main-div"]').should('have.class', 'mb-4');
  });

  it.skip('should render a large announcement when "small" prop is false', () => {
    const mockDate = new Date('2023-05-01T00:00:00Z');
    cy.clock(mockDate.getTime());

    mount(<AnnouncementHero small={false} />);

    cy.get('[data-testid="AnnouncementHero-main-div"]').should('have.class', 'mx-3 mt-3 p-3 mb-6');
  });
});
