import { mount } from 'cypress/react';
import { default as ToolsList } from '../../../../components/tools/ToolsList';
import toolsData from '../../../../config/tools.json';
describe('ToolsList Component', () => {
  it('renders correctly with toolsData', () => {
    mount(<ToolsList toolsData={toolsData} />);
    cy.get('[data-testid="ToolsList-main"]').should('exist');

    Object.keys(toolsData).forEach((categoryName, index) => {
      console.log('Current Category:', categoryName);
      cy.contains('[data-testid="ToolsList-main"]', categoryName).should('exist');
      cy.contains('[data-testid="ToolsList-main"]', toolsData[categoryName].description).should('exist');
    });
  });
});

