import { mount } from 'cypress/react';
import Testimonial from '../../../components/Testimonial';

describe('Testimonial Component', () => {
  it('should render the testimonial with correct data', () => {
    const testimonialData = {
      text: 'This is a test testimonial.',
      authorName: 'Lukasz Gornicki',
      authorDescription: 'CEO at Company',
      authorAvatar: '/img/avatars/lpgornicki.webp',
    };
    mount(
      <Testimonial
        text={ testimonialData.text }
        authorName={ testimonialData.authorName }
        authorDescription={ testimonialData.authorDescription }
        authorAvatar={ testimonialData.authorAvatar }
      />
    );

    cy.contains(testimonialData.text);
    cy.contains(testimonialData.authorName);
    cy.contains(testimonialData.authorDescription);
    cy.get('[data-testid="Testimonial-img"]').should('have.attr', 'src', testimonialData.authorAvatar);
    cy.get('[data-testid="Testimonial-img"]').should('have.attr', 'alt', testimonialData.authorName);
  });
});
