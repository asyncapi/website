import { mount } from '@cypress/react';
import ToolsCard from '../../../components/tools/ToolsCard';

describe('ToolsCard', () => {
  const toolData = {
    title: "Example Tool",
    description: "This is an example tool for testing purposes.",
    filters: {
      hasCommercial: false,
      language: {
        name: "JavaScript",
        color: "yellow",
        borderColor: "black"
      },
      technology: [
        {
          name: "React",
          color: "blue",
          borderColor: "white"
        },
        {
          name: "Node.js",
          color: "green",
          borderColor: "white"
        }
      ]
    },
    links: {
      repoUrl: "https://github.com/example/tool",
      websiteUrl: "https://example.com",
      docsUrl: "https://docs.example.com"
    }
  };
  
  it('renders ToolsCard component', () => {
    mount(<ToolsCard toolData={toolData} />);
    cy.contains(toolData.title).should('be.visible');
    cy.contains(toolData.description).should('exist');
    cy.contains('LANGUAGE').should('be.visible');
    cy.contains(toolData.filters.language.name).should('be.visible');
    cy.contains('TECHNOLOGIES').should('be.visible');
    toolData.filters.technology.forEach((tech) => {
      cy.contains(tech.name).should('be.visible');
    });
    if (toolData.links.repoUrl) {
      cy.contains('View Github').should('have.attr', 'href', toolData.links.repoUrl);
    }

    if (toolData.links.websiteUrl) {
      cy.contains('Visit Website').should('have.attr', 'href', toolData.links.websiteUrl);
    }

    if (toolData.links.docsUrl) {
      cy.contains('Visit Docs').should('have.attr', 'href', toolData.links.docsUrl);
    }
  });

});
