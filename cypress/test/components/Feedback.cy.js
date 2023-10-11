import { mount } from "cypress/react";
import Feedback from '../../../components/Feedback'
import MockRouter from '../../utils/router'
describe('Meeting component', () => {
  beforeEach(() => {
    mount(
      <MockRouter><Feedback /></MockRouter>
    );
  });

  it('shows success message on correct request', () => {
    cy.get('textarea').type('Sample feedback');
    cy.intercept('POST', '/.netlify/functions/github_discussions', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          message: 'Feedback submitted successfully',
        },
        headers: {
          'content-type': 'application/json',
        },
      });
    }).as('submitFeedback');
    cy.get('form').submit();
    cy.wait('@submitFeedback');
    cy.get('[data-testid="Feedback-div"]').should('contain.text', 'Thank you for your feedback!');

  });
  it('should display error message on failed submission', () => {
    cy.get('textarea').type('Sample feedback');
    cy.intercept('POST', '/.netlify/functions/github_discussions', (req) => {
      req.reply({
        statusCode: 500,
        body: {
          message: 'We were unable to process your feedback',
        },
        headers: {
          'content-type': 'application/json',
        },
      });
    }).as('submitFeedback');
    cy.get('form').submit();
    cy.wait('@submitFeedback');
    cy.get('[data-testid="Feedback-error"]').should('contain.text', 'Oops! Something went wrong...');
  });
});
