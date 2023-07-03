import { mount } from 'cypress/react'
import NewsroomSection from '../../../components/newsroom/NewsroomSection';
const newsroom = ["Latest news and blogs", "Welcome to our Newsroom section. Here, you'll get latest information about our blogs, articles, announcements and Youtube live-streams. Let's get upto date with the recent activities in the organization."]
describe('Features Component', () => {
    it('renders without errors', () => {
        mount(<NewsroomSection />);

    });
    it('check if Features Blog Post exists', () => {
        mount(<NewsroomSection />);
        cy.get('[data-testid="NewsroomSection-div"]').should('exist');

    });

    it('check content of Newsroom component', () => {
        mount(<NewsroomSection />);
        cy.get('[data-testid="Newsroom-sectionDiv"]').contains(newsroom[0]);
        cy.get('[data-testid="Newsroom-sectionDiv"]').contains(newsroom[1]);
        cy.get('[data-testid="NewsroomSection-Link"]').should('have.attr', 'href', '/community/newsroom')


    })

});

