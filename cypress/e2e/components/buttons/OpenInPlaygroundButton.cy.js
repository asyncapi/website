import { mount } from 'cypress/react';
import OpenInPlaygroundButton from "../../../../components/buttons/OpenInPlaygroundButton"

describe('OpenInPlaygroundButton', () => {
it('renders correctly with default props', () => {
        mount(<OpenInPlaygroundButton />);
        cy.contains('Open Playground').should('be.visible');
    });
});
