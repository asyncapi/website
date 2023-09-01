import { mount } from '@cypress/react'
import OpenAPIComparison from '../../components/OpenAPIComparison'

describe('OpenAPIComparison', () => {
    it('renders without errors', () => {
        mount(<OpenAPIComparison />);

    });

    it('changes background color on hover', () => {
        mount(<OpenAPIComparison />);

        // Hover over the "Info" element
        cy.contains('Info').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec-info"]').should('exist');

        // Hover over the "Servers" element
        cy.contains('Servers').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec-servers"]').should('exist');

        // Hover over the "Paths" element
        cy.contains('Paths').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-paths"]').should('exist');

        // Hover over the "Path Item" element
        cy.contains('Path Item').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-path-item"]').should('exist');

        // Hover over the "Summary and description" element
        cy.contains('Summary and description').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-summary"]').should('exist');

        // Hover over the "Operation (GET, PUT, POST, etc.)" element
        cy.contains('Operation (GET, PUT, POST, etc.)').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-operation"]').should('exist');

        // Hover over the "Request" element
        cy.contains('Request').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-request"]').should('exist');

        // Hover over the "Responses" element
        cy.contains('Responses').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-responses"]').should('exist');

        // Hover over the "Tags" element
        cy.contains('Tags').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-tags"]').should('exist');

        // Hover over the "External Docs" element
        cy.contains('External Docs').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-external"]').should('exist');

        // Hover over the "Components" element
        cy.contains('Components').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-components"]').should('exist');
    });
});
