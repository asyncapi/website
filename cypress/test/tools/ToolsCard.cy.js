import { mount } from '@cypress/react';
import ToolsCard from '../../../components/tools/ToolsCard';
const toolData = {
  "title": "SIO-AsyncAPI",
  "description": "This is a code-first approach to generate AsyncAPI specification from Socket.IO server.",
  "links": {
    "websiteUrl": "https://github.com/daler-rahimov/sio-asyncapi",
    "docsUrl": "https://github.com/daler-rahimov/sio-asyncapi",
    "repoUrl": "https://github.com/daler-rahimov/sio-asyncapi"
  },
  "filters": {
    "language": [
      {
        "name": "Python",
        "color": "bg-[#A8D0EF]",
        "borderColor": "border-[#3878AB]"
      }
    ],
    "technology": [
      {
        "name": "Socket.IO",
        "color": "bg-[#61d0f2]",
        "borderColor": "border-[#40ccf7]"
      },
      {
        "name": "Flask",
        "color": "bg-[#D7C7F2]",
        "borderColor": "border-[#A387D2]"
      }
    ],
    "categories": ["code-first", "api"],
    "hasCommercial": false,
    "isAsyncAPIOwner": false
  }
};

describe('ToolsCard', () => {
  beforeEach(() => {
    mount(<ToolsCard toolData={ toolData }/>);
  });
  it('renders ToolsCard component', () => {
    cy.contains(toolData.title).should('be.visible');
    cy.contains('LANGUAGE').should('be.visible');
    toolData.filters.language.forEach((lang) => {
      cy.contains(lang.name).should('be.visible');
    });
    cy.contains('TECHNOLOGIES').should('be.visible');
    toolData.filters.technology.forEach((tech) => {
      cy.contains(tech.name).should('be.visible');
    });
    if (toolData.links.repoUrl) {
      cy.get('[data-testid="ToolsCard-repoUrl"]').should('have.attr', 'href', toolData.links.repoUrl);
    }

    if (toolData.links.websiteUrl) {
      cy.get('[data-testid="ToolsCard-websiteUrl"]').should('have.attr', 'href', toolData.links.websiteUrl);
    }

    if (toolData.links.docsUrl) {
     cy.get('[data-testid="ToolsCard-docsUrl"]').should('have.attr', 'href', toolData.links.docsUrl);
    }
  });

});
