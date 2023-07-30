import { mount } from '@cypress/react';
import ToolDashboard from '../../../components/tools/ToolDashboard';
import ToolFilter from '../../../context/ToolFilterContext';


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

});
