import { mount } from 'cypress/react';
import { default as ToolsList } from '../../../components/tools/ToolsList';
import toolsData from '../../../config/tools.json';
describe('ToolsList Component', () => {
  it('renders correctly with toolsData', () => {
    mount(<ToolsList toolsData={toolsData} />);
    cy.get('[data-testid="Tools-list"]').should('exist');
    Object.keys(toolsData).forEach((categoryName, index) => {    
        cy.contains(categoryName);
        cy.contains(toolsData[categoryName].description);
    });
  });
});

