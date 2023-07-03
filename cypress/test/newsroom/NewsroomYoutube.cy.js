import { mount } from 'cypress/react'
import NewsroomYoutube from '../../../components/newsroom/NewsroomYoutube';

describe('Features Component', () => {
    it('renders without errors', () => {
        mount(<NewsroomYoutube />);
    });


    it('checks if swiper component is present', () => {
        mount(<NewsroomYoutube />);
        cy.get('[data-testid="NewsroomYoutube-div"]').should('exist')

    });
    it('slides to the next slide', () => {
        mount(<NewsroomYoutube />);
        cy.get('[data-testid="Youtube-Next"]').click();

    });

    it('slides to the previous slide', () => {
        mount(<NewsroomYoutube />);
        cy.get('[data-testid="Youtube-Prev"]').click();

    });
});