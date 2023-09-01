import { mount } from 'cypress/react'
import NewsroomSection from '../../../components/newsroom/NewsroomSection';
const newsroom = ["newsroomSection.title"]
describe('Newsroom Section Component', () => {
    beforeEach(() => {
        mount(<NewsroomSection />);
      });
    
    it('renders without errors', () => {});

    it('check if Features Blog Post exists', () => {
        cy.get('[data-testid="NewsroomSection-Featured"]').should('exist');
    });

    it('check content of Newsroom component', () => {
        cy.get('[data-testid="NewsroomSection-main"]').contains(newsroom[0]);
    })
});

