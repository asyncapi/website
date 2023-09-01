import { mount } from 'cypress/react'
import NewsroomYoutube from '../../../components/newsroom/NewsroomYoutube';

describe('Newsroom Youtube', () => {
    beforeEach(() => {
        mount(<NewsroomYoutube />);
    });

    it('renders without errors', () => {});

    it('checks if swiper component is present', () => {
        cy.get('[ data-testid="NewsroomYoutube-main"]').should('exist')
    });

    it('checks if the first slide is active', () => {
        cy.get('.swiper-slide-active').should('exist')
    });

    it('slides to the next slide', () => {
        cy.get('[data-testid="Youtube-Next-button"]').click({force: true })
        cy.get('.swiper-slide-active').should('exist')
    });

    it('slides to the previous slide', () => {
        cy.get('[data-testid="Youtube-Prev-button"]').click({force: true })
    });
});