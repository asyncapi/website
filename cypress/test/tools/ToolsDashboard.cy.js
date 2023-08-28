import { mount } from '@cypress/react';
import ToolDashboard from '../../../components/tools/ToolDashboard';
import ToolFilter from '../../../context/ToolFilterContext';
import { ToolFilterContext } from '../../../context/ToolFilterContext';
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe('ToolDashboard Component', () => {
  it('renders the ToolDashboard component correctly', () => {
    mount(
      <ToolFilter>
        <ToolDashboard />
      </ToolFilter>
    );

    //check category dropdown filters 
    cy.get('[data-testid="ToolsDashboard-category"]').click({ force: true })
    cy.get('[data-testid="CategoryDropdown-div"]').should('exist')
    cy.get('[data-testid="CategoryDropdown-div"]').find('[data-testid="CategoryDropdown-link"]').first().click({ force: true });
    const desiredValue = 'APIs';
    // desired search value into the input field
    cy.get('input[placeholder="Search by name"]').type(desiredValue);

    // Verify if the input field contains the desired value
    cy.get('input[placeholder="Search by name"]').should('have.value', desiredValue);

    //check for Filters 
    cy.get('[data-testid="ToolsDashboard-Filters-Click"]').click({ force: true })
    cy.get('[data-testid="Filters-div"]').should('exist')

    //check for Tools List 
    cy.get('[data-testid="ToolsList-main"]').should('exist');
  });
  it('checks if only selected tools are displayed', () => {
    const route = '/';
    const pathname = '/';
    const query = {};
    const asPath = '/';
    const basePath = '';
    const back = cy.stub();
    const beforePopState = cy.stub();
    const prefetch = cy.stub().resolves();
    const reload = cy.stub();
    const push = cy.stub();
    const isFallback = false;
    const defaultLocale = 'en';
    let technologies = ['Node.js'];
    const isPaid = "all";
    const isAsyncAPIOwner = false;
    const languages = [];
    const categories = [];

    mount(
      <RouterContext.Provider
        value={{
          route,
          pathname,
          query,
          asPath,
          basePath,
          back,
          beforePopState,
          prefetch,
          reload,
          push,
          isFallback,
          defaultLocale,
        }}
      >
        <ToolFilterContext.Provider value={{ isPaid, isAsyncAPIOwner, languages, technologies, categories }} >
          <ToolDashboard />
        </ToolFilterContext.Provider>
      </RouterContext.Provider>


    );
    cy.wrap(technologies).as('technologies');
    cy.get('[data-testid="ToolsDashboard-Filters-Click"]').click();

    // Interact with filter options
    cy.get('[data-testid="Filters-Technology-dropdown"]').within(() => {
      cy.contains('Select Technologies..').click();
      cy.contains('Node.js').click();
      cy.get('@technologies').should('deep.equal', ['Node.js']);
    });
    cy.get('[data-testid="Button-main"]').click({ force: true });
    cy.contains('SIO-AsyncAPI').should('not.exist')
    /**This tool contains "Python as technology and thus should not be rendered when Technology is Node.js" */
    
  });
});
