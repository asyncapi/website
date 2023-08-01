import MockApp from "../../../utils/MockApp";
import DashboardHome from "../../../../pages/community/dashboard";
import Header from "../../../../components/dashboard/Header";
import { mount } from '@cypress/react'
describe('Integration Test for Dashboard ', () => {

    it('should filter GoodFirstIssues and check dashboard render ', () => {
        mount(
            <MockApp>
                <DashboardHome />
            </MockApp>
        );
        // Click on the first filter option
        cy.get(Header).should('exist')
        cy.contains('AsyncAPI - Dashboard')
        cy.get('[data-testid="Filters-img-container"]').click({ force: true });
        cy.get('[data-testid="Filter-menu"]').within(() => {
            cy.get('[data-testid="Select-form"]').eq(0).select('asyncapi/generator', { force: true });
            cy.get('[data-testid="Select-form"]').eq(1).select('docs')
        });
        //check if selected is only displayed
        cy.contains('asyncapi/generator');
        cy.contains('docs')
        //check if this is not selected options are not displayed
        cy.should('not.contain', 'asyncapi/community');
        cy.should('not.contain', 'javascript');
    });
});