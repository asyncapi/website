import React from 'react';
import { mount } from 'cypress/react';
import Figure from '../../components/Figure';

describe('Figure', () => {
  it('renders the figure with the image and caption', () => {
    const src = '/img/posts/2020-summary/active-members.webp';
    const caption = 'Figure 1: Slack active members weekly';
    const widthClass = 'w-50';
    const className = 'custom-class';
    const float = 'left';
    const altOnly = 'Alt Text';
    const imageClass = 'custom-image-class';

    mount(
      <Figure
        src={src}
        caption={caption}
        widthClass={widthClass}
        className={className}
        float={float}
        altOnly={altOnly}
        imageClass={imageClass}
      />
    );

    cy.get('[data-testid="Figure-div"]').should('have.class', className);
    cy.get('[data-testid="Figure-div"]').should('have.class', `float-${float}`);
    cy.get('[data-testid="Figure-div"]').should('have.class', widthClass);

    cy.get('[data-testid="Figure-img"]').should('have.attr', 'src', src);
    cy.get('[data-testid="Figure-img"]').should('have.attr', 'alt', altOnly);
    cy.get('[data-testid="Figure-img"]').should('have.class', imageClass);

    cy.contains(caption).should('be.visible');
    cy.contains(caption).should('have.text', caption);
  });
});
