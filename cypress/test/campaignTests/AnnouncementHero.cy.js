import React from 'react';
import { mount } from '@cypress/react';
import AnnouncementHero from '../../../components/campaigns/AnnoucementHero';

describe('AnnouncementHero Component', () => {
  it('should render the component when the date is within the valid range', () => {
    // Set the current date to May
    const mockDate = new Date('2023-05-01T00:00:00Z');
    cy.clock(mockDate.getTime());
    mount(<AnnouncementHero />);
    // Assert that the component is rendered 
    //check for background color 
    cy.get('[data-testid="AnnouncementHero-main-div"]').should('have.class','bg-gray-50');
  });

  it('should not render the component when the date is outside the valid range', () => {
    // Set the current date to June
    const mockDate = new Date('2023-06-01T00:00:00Z');
    cy.clock(mockDate.getTime());
     mount(<AnnouncementHero />);
    // Assert that the component is not rendered
    cy.get('[data-testid="AnnouncementHero-main-div"]').should('not.exist');
  });

  it('should display the correct event information', () => {
    const mockDate = new Date('2023-05-01T00:00:00Z');
    cy.clock(mockDate.getTime());
    mount(<AnnouncementHero />);
    // Assert the event details
    cy.get('[data-testid="AnnouncementHero-main-div"]').contains( 'AsyncAPI Conf on Tour 2023').should('exist');
    cy.get('[data-testid="AnnouncementHero-main-div"]').contains( 'Madrid Edition').should('exist');
    cy.get('[data-testid="AnnouncementHero-main-div"]').contains('October, 2023 | Madrid, Spain').should('exist');
    cy.contains('Submit a session').should('exist');
  });

  it('should have a link to submit a session', () => {
    const mockDate = new Date('2023-05-01T00:00:00Z');
    cy.clock(mockDate.getTime());
    mount(<AnnouncementHero />);
    // Assert the link
    cy.get('[data-testid="AnnouncementHero-submit-session"]').should('have.attr', 'href', 'https://sessionize.com/aacot-madrid/')
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

    cy.get('[data-testid="AnnouncementHero-main-div"]').should('have.class', 'mb-12');
  });
});
