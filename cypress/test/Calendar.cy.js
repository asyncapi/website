import React from 'react';
import { mount } from 'cypress/react';
import Calendar from '../../components/Calendar';
import eventsData from '../../config/meetings.json';

describe('Calendar component', () => {
  beforeEach(() => {
    mount(<Calendar />);
  });

  it('renders the upcoming events', () => {
    cy.get('[data-testid="Calendar-list-item"]').should('have.length', eventsData.length);
  });

  it('renders the "View Calendar" button if events exist', () => {
    if (eventsData.length > 0) {
      cy.get('[data-testid="Calendar-button"]').should('be.visible');
    } else {
        cy.get('[data-testid="Calendar-button"]').should('not.exist');
    }
  });

  it('renders the "No meetings scheduled" message if no events exist', () => {
    if (eventsData.length === 0) {
      cy.contains('There are no meetings scheduled for next few days.').should('be.visible');
    } else {
      cy.contains('There are no meetings scheduled for next few days.').should('not.exist');
    }
  });
});
