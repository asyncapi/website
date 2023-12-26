import Casestudies from "../../../../pages/casestudies";
import MockApp from "../../../utils/MockApp";
import { mount } from 'cypress/react';
import AdoptersList from "../../../../config/adopters.json"

describe('Test for Case Study Pages', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <Casestudies />
            </MockApp>
        );
        cy.get('[data-testid="CaseStudy-main"]').should('exist');
        cy.get('[data-testid="CaseStudy-card"]').should('exist');
    });

    it('Adopters section renders correctly', () => {
        mount(
            <MockApp>
                <Casestudies />
            </MockApp>
        );
        cy.get('[data-testid="Adopters"]').should('have.length', AdoptersList.length);

        cy.get('table')
            .should('exist')
            .within(() => {
                // Check table headers
                cy.get('th').eq(0).should('have.text', 'Company name');
                cy.get('th').eq(1).should('have.text', 'Use Case');
                cy.get('th').eq(2).should('have.text', 'Resources');

                // Check table data
                cy.get('tbody tr').should('have.length', AdoptersList.length);
                AdoptersList.forEach((entry, index) => {
                    cy.get('tbody tr').eq(index).find('td').eq(0).should('have.text', entry.companyName);
                    cy.get('tbody tr').eq(index).find('td').eq(1).should('have.text', entry.useCase);
                });
            });
    })
});