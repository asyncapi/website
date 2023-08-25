import React from 'react';
import { mount } from 'cypress/react';
import Button from '../../../../components/buttons/Button';
import IconGithub from '../../../../components/icons/Github';
describe('Button component', () => {
  it('renders a button without href', () => {
    const text = 'Click me';
    const type = 'button';
    const icon = <IconGithub />;
    mount(
      <Button text={text} type={type} icon={icon} />
    );
    cy.get('[data-testid="Button-main"]').should('have.text', text);
    cy.get('[data-testid="Button-main"]').should('have.attr', 'type', type);
    cy.get('[data-testid="Button-link"]').should('not.exist');
  });

  it('renders a button with href', () => {
    const text = 'Click me';
    const href = '/link';
    const target = '_blank';
    mount(
      <Button text={text} href={href} target={target} />
    );
    cy.get('[data-testid="Button-link"]').should('have.text', text);
    cy.get('[data-testid="Button-link"]').should('have.attr', 'href', href);
    cy.get('[data-testid="Button-link"]').should('have.attr', 'target', target);
    cy.get('[data-testid="Button-main"]').should('not.exist');
  });

  it('renders a small button', () => {
    const text = 'Click me';
    const buttonSize = 'small';
    mount(
      <Button text={text} buttonSize={buttonSize} />
    );
    cy.get('[data-testid="Button-main"]').should('have.class', 'px-3 py-2 text-sm');
  });
  it('renders a button with custom class', () => {
    const text = 'Click me';
    const className = 'custom-button';

    mount(
      <Button text={text} className={className} />
    );
    cy.get('[data-testid="Button-main"]').should('have.class', className);
  });

  it('does not render an icon with position left in the button', () => {
    const text = 'Click me';
    mount(
      <Button text={text} />
    );
    cy.get('[data-testid="Button-icon-left"]').should('not.exist');
  });

  it('does not render an icon with position left in the button', () => {
    const text = 'Click me';
    mount(
      <Button text={text} />
    );
    cy.get('[data-testid="Button-icon-right"]').should('not.exist');
  });
});
