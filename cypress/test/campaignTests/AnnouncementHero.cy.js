import React from 'react';
import { mount } from '@cypress/react';
import AnnouncementHero from '../../../components/campaigns/AnnoucementHero';
beforeEach(() => {
  const mockDate = new Date('2023-05-01T00:00:00Z');
  cy.clock(mockDate.getTime());
  mount(<AnnouncementHero />);
});

describe('AnnouncementHero Component', () => {
  it('should render the component when the date is within the valid range', () => {
    const mockDate = new Date(2021, 10, 12).getTime();
    cy.clock(mockDate);
    cy.get('[data-testid="AnnouncementHero-main-div"]').should('exist');
  });

  //check if announcement rendered is small or large .
  it('should render a small announcement when "small" prop is true', () => {
    mount(<AnnouncementHero small />);
    cy.get('[data-testid="AnnouncementHero-main-div"]').should('have.class', 'mb-4');
  });

  it('should display the correct event information', () => {
    // Assert the event details
    cy.get('[data-testid="Paragraph-test"]').should('exist');
    cy.get('h2').should('exist');
    cy.get('h3').should('exist');
  
  });

  it('should have a link to submit a session', () => {
    // Assert the link
    cy.get('[data-testid="Button-link"]').should('have.attr', 'href', 'https://conference.asyncapi.com/')
      .should('have.attr', 'target', '_blank')
      .contains('Submit a session');
  });

  //check if announcement rendered is small or large .
  it('should render a small announcement when "small" prop is true', () => {
    const mockDate = new Date('2023-05-01T00:00:00Z');
    cy.clock(mockDate.getTime());

    mount(<AnnouncementHero small />);

    cy.get('[data-testid="AnnouncementHero-main-div"]').should('have.class', 'mb-4');
  });

  it('should render a large announcement when "small" prop is false', () => {
    const mockDate = new Date('2023-05-01T00:00:00Z');
    cy.clock(mockDate.getTime());

    mount(<AnnouncementHero small={false} />);

    cy.get('[data-testid="AnnouncementHero-main-div"]').should('have.class', 'mx-3 mt-3 p-3 mb-6');
  });
});
