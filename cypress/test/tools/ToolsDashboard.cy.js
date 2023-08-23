import { mount } from '@cypress/react';
import ToolDashboard from '../../../components/tools/ToolDashboard';
import ToolFilter from '../../../context/ToolFilterContext';
import { ToolFilterContext } from '../../../context/ToolFilterContext';

describe('ToolDashboard Component', () => {
  it('renders the ToolDashboard component correctly', () => {
    mount(
      <ToolFilter>
        <ToolDashboard />
      </ToolFilter>
    );

    //check category dropdown filters 
    cy.get('[data-testid="ToolsDashboard-category"]').click({force:true})
    cy.get('[data-testid="CategoryDropdown-div"]').should('exist')
    cy.get('[data-testid="CategoryDropdown-div"]').find('[data-testid="CategoryDropdown-link"]').first().click({force:true});
    const desiredValue = 'APIs';
    // desired search value into the input field
    cy.get('input[placeholder="Search by name"]').type(desiredValue);

    // Verify if the input field contains the desired value
    cy.get('input[placeholder="Search by name"]').should('have.value', desiredValue);

    //check for Filters 
    cy.get('[data-testid="ToolsDashboard-Filters-Click"]').click({force:true})
    cy.get('[data-testid="Filters-div"]').should('exist')

    //check for Tools List 
    cy.get('[data-testid="ToolsList-main"]').should('exist');
  });
  it('checks if only selected tools are displayed' ,() => {
    const initialContextValues = {
      isPaid: false,
      isAsyncAPIOwner: false,
      languages: [],         // Replace with initial selected languages
      technologies: ['Node.js'],      // Replace with initial selected technologies
      categories: [],        // Replace with initial selected categories
    };
    
    mount(
      <ToolFilterContext.Provider value={initialContextValues}>
        <ToolDashboard />
        </ToolFilterContext.Provider>

    );
        // Aliasing the context variables
        cy.wrap(initialContextValues.isPaid).as('isPaid');
        cy.wrap(initialContextValues.isAsyncAPIOwner).as('isAsyncAPIOwner');
        cy.wrap(initialContextValues.languages).as('languages');
        cy.wrap(initialContextValues.technologies).as('technologies');
        cy.wrap(initialContextValues.categories).as('categories');
        cy.get('[data-testid="ToolsDashboard-Filters-Click"]').click({force:true})
        cy.get('[data-testid="Filters-div"]').should('exist')
        cy.get('[data-testid="Applied-filters"]').click({force:true});
        // Check if context variables are updated after applying filters
        cy.get('@isPaid').should('be.false');                 // Replace with expected value
        cy.get('@isAsyncAPIOwner').should('be.false');        // Replace with expected value
        cy.get('@languages').should('deep.equal', []);        // Replace with expected value
        cy.get('@technologies').should('deep.equal', ['Node.js']);     // Replace with expected value
        cy.get('@categories').should('deep.equal', []);       // Replace with expected value

  })
});
