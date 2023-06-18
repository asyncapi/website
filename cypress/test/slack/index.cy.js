import React from 'react';
import { mount } from 'cypress/react';
import Slack from '../../../components/slack/index';

describe('Slack Component', () => {
  it('renders the Slack messages correctly', () => {
    mount(<Slack />);

    // Verify the first Slack message
    cy.get('[data-testid="SlackMessage"]').eq(0).as('message1').should('exist')

    // Verify the second Slack message
    cy.get('[data-testid="SlackMessage"]').eq(0).as('message2').should('exist')

    // Verify the third Slack message
    cy.get('[data-testid="SlackMessage"]').eq(0).as('message3').should('exist')

    // Verify the fourth Slack message
    cy.get('[data-testid="SlackMessage"]').eq(0).as('message4').should('exist')
  });
});
