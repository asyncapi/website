import React from 'react';
import { mount } from 'cypress/react';
import Figure from '../../components/Figure';

describe('Figure', () => {
  it('renders the figure with the image and caption', () => {
    const src = 'example.jpg';
    const caption = 'Example Caption';
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

    cy.contains('Caption').should('be.visible');
    cy.contains('Caption').should('have.text', caption);
  });
});
