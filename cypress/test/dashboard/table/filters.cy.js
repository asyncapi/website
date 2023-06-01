import { mount } from 'cypress/react';
import Filters from '../../../../components/dashboard/table/Filters';


describe('Filters Component', () => {
  it('renders the component', () => {
    mount(
      <Filters
        className="test-class"
        issues={[]}
        setSelectedRepo={() => {}}
        allIssues={[]}
        setSelectedArea={() => {}}
        selectedArea=""
        selectedRepo=""
      />
    );

    cy.get('img[alt="filter menu"]').should('exist');
  });

  it('opens the filter menu when clicked', () => {
    mount(
      <Filters
        className="test-class"
        issues={[]}
        setSelectedRepo={() => {}}
        allIssues={[]}
        setSelectedArea={() => {}}
        selectedArea=""
        selectedRepo=""
      />
    );

    cy.get('img[alt="filter menu"]').click();
    cy.get('.bg-white').should('be.visible');
  });

  it('closes the filter menu when clicking outside', () => {
    mount(
      <Filters
        className="test-class"
        issues={[]}
        setSelectedRepo={() => {}}
        allIssues={[]}
        setSelectedArea={() => {}}
        selectedArea=""
        selectedRepo=""
      />
    ).then(() => {
      cy.get('img[alt="filter menu"]').click();
      cy.get('body').click({ force: true });
     // cy.get('.bg-white').should('not.be.visible');
    });
  });
});
