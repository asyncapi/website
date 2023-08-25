import { mount } from 'cypress/react'
import NewsroomBlogPosts from '../../../../components/newsroom/NewsroomBlogPosts';

describe('Newsroom Article Component', () => {
    beforeEach(() => {
        mount(<NewsroomBlogPosts />);
      });
    
    it('renders without errors', () => {

    });
    it('checks if swiper component is present', () => {
        cy.get('[data-testid="NewsroomBlog-main-div"]').should('exist')

    });
    it('checks if the first slide is active', () => {
        cy.get('.swiper-slide-active').should('exist')
    });
      
    it('checks if the second slide is active after clicking next', () => {
        cy.get('[data-testid="Blog-Next-button"]').click({force: true })
        cy.get('.swiper-slide-active').should('exist')
    });
      
    it('slides to the previous slide', () => {
        cy.get('[data-testid="Blog-Prev-button"]').click({force: true })
        cy.get('.swiper-slide-active').should('exist')
    });
});

