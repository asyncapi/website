import MockApp from "../../../utils/MockApp";
import TSC from '../../../../pages/community/tsc'

describe('TSC', () => {
    beforeEach(() => {
        cy.mount(<MockApp><TSC /></MockApp>)
    });

    it('displays basic TSC ', () => {
        cy.get('[data-testid="TSC-content"]').should('exist');
        cy.get(`[href="https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md"]`).should('exist');
        cy.get('[data-testid="TSC-Governance-Link"]').should('have.attr', 'href', 'https://github.com/asyncapi/community/blob/master/CHARTER.md')
        cy.get('[data-testid="TSC-Article-Link"]').should('have.attr', 'href', 'https://www.asyncapi.com/blog/governance-motivation')
        cy.get('[data-testid="NewsletterSubscribe-main"]').should('exist')
    });
    
    it("should display TSC members", () => {
        // Check if the "Current TSC members" section is visible
        cy.contains("Current TSC members").should("be.visible");

        // Check if each TSC member card contains the required information
        cy.get('[data-testid="UserInfo-list"]').each((member) => {
            cy.wrap(member).within(() => {
                // Check if the user's name and avatar are visible
                cy.get('[data-testid="UserInfo-avatar"]').should("be.visible");
                cy.get('[data-testid="UserInfo-name"]').should("be.visible");

                // Check if the user's work status is visible
                cy.get('[data-testid="status-element"]').should("be.visible");

                // Check if the social links are visible
                cy.get('[data-testid="Social-Links"]').should("have.length.gt", 0);
                cy.get('[data-testid="Repo-Links"]').should("have.length.gt", 0);
            });
        });

    });

    it("should have valid social links", () => {
        // Check if each TSC member card's social links are valid
        cy.get('[data-testid="UserInfo-list"]').each((member) => {
            cy.wrap(member).within(() => {
                cy.get('[data-testid="Social-Links"]').each((socialLink) => {
                    cy.wrap(socialLink)
                        .should("have.attr", "href")
                        .and("match", /^(https?:\/\/)/);
                });
            });
        });
    });

    it('displays Question Card ', () => {
        cy.get('[data-testid="Question-card"]').should('exist');
        cy.get('[data-testid="Question-card-img"]').should('exist');
        cy.get(`[href="https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md"]`).should('exist');
    });
});

