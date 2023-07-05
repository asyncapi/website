import { mount } from 'cypress/react'
import NavItem from '../../../components/navigation/NavItem';
describe('NavItem', () => {

    it('renders a button with dropdown correctly', () => {
        const props = {
            text: 'About',
            href: null,
            target: '_self',
            onClick: () => { },
            onMouseEnter: () => { },
            hasDropdown: true,
            className: '',
        };

        mount(<NavItem { ...props } />);

        cy.contains('About').should('exist');
        cy.get('button').should('have.text', 'About');

    });

    it('renders a button without dropdown correctly', () => {
        const props = {
            text: 'Contact',
            href: null,
            target: '_self',
            onClick: () => { },
            onMouseEnter: () => { },
            hasDropdown: false,
            className: '',
        };

        mount(<NavItem { ...props } />);

        cy.contains('Contact').should('exist');
        cy.get('button').should('have.text', 'Contact');
    });


});
