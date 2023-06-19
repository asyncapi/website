import { mount } from 'cypress/react';
import JobSummary from '../../components/JobSummary';
describe('JobSummary', () => {
  it('renders job summary with correct information', () => {
    const job = {
      location: 'remote',
      region: 'Anywhere (on planet Earth)',
      employmentType: 'full-time',
      closingOn: '2023-06-30',
    };

    mount(<JobSummary job={job} className="custom-class" />);
    cy.get('[data-testid="JobSummary-dd"]').contains('Remote').should('exist');
    cy.get('[ data-testid="JobSummary-paragraph"]').contains('Anywhere (on planet Earth)').should('exist');
    cy.contains('Full-time').should('exist');
    cy.contains('Closing on').should('exist');
    cy.contains('June 30, 2023').should('exist');
  });
});
