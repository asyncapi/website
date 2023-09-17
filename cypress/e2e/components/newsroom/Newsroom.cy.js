import { mount } from 'cypress/react'
import Newsroom from '../../../../components/newsroom/Newsroom'
const newsroomHeadings = ["Latest Updates","From the blog"]
describe('Newsroom Component', () => {
    beforeEach(() => {
        mount(<Newsroom />);
    });
    
    it('renders without errors', () => {
        cy.get('[data-testid="Newsroom-main"]').contains(newsroomHeadings[0])
        cy.get('[data-testid="Newsroom-sub-div"]').contains(newsroomHeadings[1])
        cy.get('[data-testid="Newsroom-Blog"]').should('exist')
    });

    it('checks link href', () => {
        cy.get('[data-testid="Newsroom-Blog-Link"]').find('a').should('have.attr', 'href', '/blog') // Check the blog href attribute
        cy.get('[ data-testid="Newsroom-Twitter-Link"]').find('a').should('have.attr', 'href', 'https://twitter.com/AsyncAPISpec') //check twitter
        cy.get('[data-testid="Newsroom-Youtube"]').find('a').should('have.attr', 'href', 'https://www.youtube.com/c/AsyncAPI') //check youtube link
    });

    it('checks TwitterTimelineEmbed', () => {
        cy.get('[data-testid="Newsroom-Twitter"]').should('exist');  // data-test was not working
    });
});
