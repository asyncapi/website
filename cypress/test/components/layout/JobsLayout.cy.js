import React from 'react';
import JobsLayout from '../../../../components/layout/JobsLayout';
import MockRouter from '../../../utils/router'
describe('Job Layout Component', () => {
  beforeEach(() => {
    cy.fixture('jobpost.json').as('jobsData');
  });
  
  it('renders correct JobLayout component', () => {
    cy.get('@jobsData').then((jobsData) => {
      cy.mount(
        <MockRouter asPath="/jobs/apiture-api-architect">
          <JobsLayout post={ jobsData } />
        </MockRouter>
      );
      cy.get('[data-testid="JobsLayout-Heading"]').contains(jobsData.title);
    });
  });

  it('renders Error Page , if post is not found ', () => {
    cy.mount(
      <MockRouter>
        <JobsLayout />
      </MockRouter>
    )
  });
});
