import React from 'react';
import { mount } from 'cypress/react';
import Header from '../../../components/dashboard/Header';
import Button from '../../../components/buttons/Button';
import GithubButton from '../../../components/buttons/GithubButton';
import SlackButton from '../../../components/buttons/SlackButton';

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
    cy.get('.text-gray-900').should('contain', 'Dashboard');
    cy.get('.text-gray-700').should(
      'contain',
      'Visualize our progress. Get involved.'
    );
    cy.get('[data-testid="github-button"]').should('exist');
    cy.get('[data-testid="slack-button"]').should('exist');
    cy.contains('Contribution Guide')
      .should('have.attr', 'href', 'https://github.com/asyncapi?type=source#-contribute-to-asyncapi')
      .should('have.attr', 'target', '_blank');
  });
});
