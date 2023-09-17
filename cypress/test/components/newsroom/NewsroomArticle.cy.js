import { mount } from 'cypress/react'
import NewsroomArticle from '../../../../components/newsroom/NewsroomArticle'
import articlesData from '../../../../config/articles.json'

describe('Newsroom Article Component', () => {
    it('renders without errors', () => {
        mount(<NewsroomArticle articlesData={ articlesData } />);
        articlesData.forEach((article, index) => {
            cy.get(`[data-testid="NewsroomArticle-${ index }"]`).should('have.attr', 'href', article.url);
            cy.get(`[data-testid="NewsroomArticle-${ index }"]`).should('contain.text', article.title);
            cy.get(`[data-testid="NewsroomArticle-${ index }"]`).should('contain.text', article.publishDate);
        });
    });
});