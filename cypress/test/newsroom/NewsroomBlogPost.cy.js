import { mount } from 'cypress/react'
import NewsroomBlogPosts from '../../../components/newsroom/NewsroomBlogPosts';


describe('Features Component', () => {
    it('renders without errors', () => {
        mount(<NewsroomBlogPosts />);

    });
    it('checks if swiper component is present', () => {
        mount(<NewsroomBlogPosts />);
        cy.get('[data-testid="NewsroomBlog-main-div"]').should('exist')

    });
    it('slides to the next slide', () => {
        mount(<NewsroomBlogPosts />);
        cy.get('[data-testid="Blog-Next"]').click();

    });

    it('slides to the previous slide', () => {
        mount(<NewsroomBlogPosts />);
        cy.get('[data-testid="Blog-Prev"]').click();

    });


});

