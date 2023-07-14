import { mount } from '@cypress/react';
import ToolsCard from '../../../components/tools/ToolsCard';
const toolData = {
  title: "Example Tool",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
describe('ToolsCard', () => {
  beforeEach(() => {
    mount(<ToolsCard toolData={ toolData }/>);
  });
  it('renders ToolsCard component', () => {
    cy.contains(toolData.title).should('be.visible');
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
