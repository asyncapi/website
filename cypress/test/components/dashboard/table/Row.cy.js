import React from 'react';
import { mount } from 'cypress/react';
import Row from '../../../../../components/dashboard/table/Row';

describe('Row component', () => {
  const item = {
    resourcePath: 'asyncapi',
    isPR: false,
    repo: 'asyncapi',
    title: 'Example Issue',
    labels: [
      { name: 'bug' },
      { name: 'feature' },
    ],
  };

  it('renders the component correctly', () => {
    mount(<Row item={item} />);

    // Assert that the component is rendered
    cy.get('li').should('exist');
    cy.get('.p-4').should('exist');
    cy.get('a').should('have.attr', 'href', 'https://github.com/asyncapi');

    // Assert the content within the component
   
    cy.get('.text-base').should('have.text', 'Example Issue');
   cy.get('.flex-wrap > :nth-child(1)').should('have.text', 'bug');
    cy.get('.flex-wrap > :nth-child(2)').should('have.text', 'feature');
  });

  it('opens the link in a new tab', () => {
    mount(<Row item={item} />);

    // Assert that the link opens in a new tab
    cy.get('[data-testid="Row-github-redirect"]').should('have.attr', 'target', '_blank');
    cy.get('[data-testid="Row-github-redirect"]').should('have.attr', 'rel', 'noreferrer');
  });

  it('renders the correct icon based on isPR prop', () => {
    item.isPR = true;
    mount(<Row item={item} />);

    // Assert that the correct icon is rendered for a PR
    cy.get('[data-testid="Row-img-issue"]').should('have.attr', 'src', '/img/illustrations/icons/issue.svg');

    item.isPR = false;
    mount(<Row item={item} />);

    // Assert that the correct icon is rendered for an issue
    cy.get('[data-testid="Row-img-issue"]').should('have.attr', 'src', '/img/illustrations/icons/issue.svg');
  });
});
