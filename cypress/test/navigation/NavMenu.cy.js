import React from 'react';
import { mount } from '@cypress/react';
import NavMenu from '../../../components/navigation/NavMenu';
import MockRouter from '../../utils/router';

describe('NavMenu', () => {
    const items = [
        {
            href: '/page1',
            target: '_self',
            text: 'Page 1',
            description: 'Description for Page 1',
        },
        {
            href: '/page2',
            target: '_blank',
            text: 'Page 2',
            description: 'Description for Page 2',
        },
    ];
    it('renders the component correctly', () => {
        mount(
            <MockRouter> <NavMenu items={items} /> </MockRouter>
        );
        cy.get('[data-testid="Paragraph-test" ]').should('contain', 'Page 1');
        cy.get('[data-testid="Paragraph-test" ]').should('contain', 'Page 2');
        cy.get('[data-testid="Paragraph-test" ]').should('contain', 'Description for Page 1');
        cy.get('[data-testid="Paragraph-test" ]').should('contain', 'Description for Page 2');
        cy.get('[data-testid="NavMenu-Link"]').should('exist',) ;
       
    });
});
