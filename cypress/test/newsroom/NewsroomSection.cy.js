import { mount } from 'cypress/react'
import NewsroomSection from '../../../components/newsroom/NewsroomSection';
const newsroom = ["Latest news and blogs", "Welcome to our Newsroom section. Here, you'll get latest information about our blogs, articles, announcements and Youtube live-streams. Let's get upto date with the recent activities in the organization."]
describe('Newsroom Section Component', () => {
    beforeEach(() => {
        mount(<NewsroomSection />);
      });
    
    it('renders without errors', () => {

    });
    it('check if Features Blog Post exists', () => {
        cy.get('[data-testid="NewsroomSection-Featured"]').should('exist');

    });

    it('check content of Newsroom component', () => {
        cy.get('[data-testid="NewsroomSection-main"]').contains(newsroom[0]);
        cy.get('[data-testid="NewsroomSection-main"]').contains(newsroom[1]);
    })

});

