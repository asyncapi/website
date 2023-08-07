import React from 'react';
import { mount } from '@cypress/react';
import AnnouncementHero from '../../../components/campaigns/AnnoucementHero';
beforeEach(() => {
  mount(<AnnouncementHero />);
});

describe('AnnouncementHero Component', () => {
  it('should render the component when the date is within the valid range', () => {
    const mockDate = new Date(2021, 10, 12).getTime();
    cy.clock(mockDate);
    cy.get('[data-testid="AnnouncementHero-main-div"]').should('not.exist');
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
