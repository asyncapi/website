import Casestudies from "../../../../pages/casestudies";
import MockApp from "../../../utils/MockApp";
import {mount} from 'cypress/react';
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
});