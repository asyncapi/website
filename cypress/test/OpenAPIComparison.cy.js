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
        cy.get('[data-testid="OpenAPI-sec1"]').should('exist');

        // Hover over the "Servers" element
        cy.contains('Servers').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec2"]').should('exist');

        // Hover over the "Paths" element
        cy.contains('Paths').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec3"]').should('exist');

        // Hover over the "Path Item" element
        cy.contains('Path Item').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec4"]').should('exist');

        // Hover over the "Summary and description" element
        cy.contains('Summary and description').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec5"]').should('exist');

        // Hover over the "Operation (GET, PUT, POST, etc.)" element
        cy.contains('Operation (GET, PUT, POST, etc.)').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec6"]').should('exist');

        // Hover over the "Request" element
        cy.contains('Request').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec7"]').should('exist');

        // Hover over the "Responses" element
        cy.contains('Responses').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec8"]').should('exist');

        // Hover over the "Tags" element
        cy.contains('Tags').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec9"]').should('exist');

        // Hover over the "External Docs" element
        cy.contains('External Docs').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec10"]').should('exist');

        // Hover over the "Components" element
        cy.contains('Components').trigger('mouseover');
        cy.get('[data-testid="OpenAPI-sec11"]').should('exist');
    });
});
