import MockApp from "../../../../utils/mockApp";
import Index from '../../../../../pages/community/ambassadors/index'
import ambassadorList from '../../../../../config/ambassador_lists.json'
import ambassadors from '../../../../../config/AMBASSADORS_MEMBERS.json'
import { addAdditionalUserInfo } from "../../../../../pages/community/ambassadors/index";
import { sortBy } from 'lodash';
describe('Test for Ambassadors', () => {
    beforeEach(() => {
        cy.mount(<MockApp><Index /></MockApp>)
    });

    it('displays the main Ambassadors section ', () => {
        cy.get('[data-testid="Ambassadors-main"]').should('exist')
        cy.get('[data-testid="Ambassadors-content"]').should('exist')
        cy.get('[data-testid="Ambassadors-button"]').should('exist')
        cy.get(`[href="https://github.com/asyncapi/community/blob/master/AMBASSADOR_ORGANIZATION.md#are-you-interested-in-becoming-an-official-asyncapi-ambassador"]`).should('exist');
        cy.get('[data-testid="Ambassadors-Iframe"]').should('exist')
        cy.get('[data-testid="Ambassadors-contributions"]').should('exist')
    });

    it('renders the ambassador list with correct data', () => {
        ambassadorList.contents.forEach((link) => {
            cy.get('[data-testid="Ambassadors-list"]')
                .find(`img[alt="${link.title}"]`)
                .should('exist')
                .and('have.attr', 'src', link.icon);

            cy.get('[data-testid="Ambassadors-list"]')
                .contains('h2', link.title)
                .should('exist');

            cy.get('[data-testid="Ambassadors-list"]')
                .contains('p', link.details)
                .should('exist');
        });
    });

    it('renders the ambassadors with correct data', () => {
        const asyncapiAmbassadors = sortBy(
            ambassadors.map((user) => addAdditionalUserInfo(user)),
            ['name']
        );
        cy.get('[data-testid="Ambassadors-members-main"]')
            .children()
            .should('have.length', asyncapiAmbassadors.length);

        asyncapiAmbassadors.forEach((ambassador) => {
            cy.get('[data-testid="Ambassadors-members-details"]')
                .contains('div', ambassador.name)

            cy.get('[data-testid="Ambassadors-members-img"]')
                .find(`img[alt="${ambassador.name}"]`)

                .and('have.attr', 'src', ambassador.img);

            cy.get('[data-testid="Ambassadors-members"]')
                .contains('div', ambassador.title);

        });

    });

    it('displays the Tokens of our appreciation section with correct data', () => {
        cy.contains('Tokens of our appreciation').should('exist');

        cy.contains('We appreciate your commitment and passion for sharing your knowledge with your communities. Let us support you!')
            .should('exist');

        ambassadorList.tokens.forEach((token) => {
            cy.contains('.mt-20 li', token.emoji).should('exist');
            cy.contains('.mt-20 li', token.title).should('exist');
            cy.contains('.mt-20 li', token.details).should('exist');
        });
    });

    it('displays the Become an AsyncAPI Ambassador section with correct data', () => {
        cy.contains('Become an AsyncAPI Ambassador').should('exist');

        cy.contains('The AsyncAPI Ambassador program is now open for applications! If you’re selected, you’ll join AsyncAPI\'s mission of helping community members all over the world, build the future of Event-Driven APIs.')
            .should('exist');

        cy.contains('Become an Ambassador now')
            .should('have.attr', 'href', 'https://github.com/asyncapi/community/blob/master/AMBASSADOR_ORGANIZATION.md#are-you-interested-in-becoming-an-official-asyncapi-ambassador');
    });

    it('should display NewsletterSubscribe', () => {
        cy.get('[data-testid="NewsletterSubscribe-main"]').should('exist');
        cy.get('[data-testid="NewsletterSubscribe-text-input"]').type("name");
        cy.get('[data-testid="NewsletterSubscribe-email-input"]').type("test@gmail.com")
        cy.get('form[name="form 1"]').should('exist');
        cy.get('input[name="type"]').should('exist');
        cy.get('input[name="name"]').should('exist');
        cy.get('input[name="email"]').should('exist');
    });
});