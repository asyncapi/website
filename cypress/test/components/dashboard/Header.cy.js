import React from 'react';
import { mount } from 'cypress/react';
import Header from '../../../../components/dashboard/Header';
import Button from '../../../../components/buttons/Button';
import GithubButton from '../../../../components/buttons/GithubButton';
import SlackButton from '../../../../components/buttons/SlackButton';

describe('Header', () => {
  beforeEach(() => {
    mount(
      <Header
        ButtonComponent={Button}
        GithubButtonComponent={() => <GithubButton size="small" />}
        SlackButtonComponent={SlackButton}
      />
    );
  });

  it('renders the header correctly', () => {
    cy.get('[data-testid="Header-heading"]').should('contain', 'Dashboard');
    cy.get('[data-testid="Header-paragraph"]').should(
      'contain',
      'Visualize our progress. Get involved.'
    );

    cy.contains('Contribution Guide')
      .should('have.attr', 'href', 'https://github.com/asyncapi?type=source#-contribute-to-asyncapi')
      .should('have.attr', 'target', '_blank');
    cy.get('[data-testid="Button-link"]').should('exist');
    cy.get('[data-testid="Button-link"]').should('exist');
  });
});
