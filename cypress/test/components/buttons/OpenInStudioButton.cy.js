import { mount } from 'cypress/react';
import OpenInStudioButton from '../../../../components/buttons/OpenInStudioButton';

describe('OpenInStudioButton', () => {

    it('renders correctly with custom props', () => {
        mount(
            < OpenInStudioButton
                text="Custom Text"
                target="_self"
                iconPosition="right"
            />
        );
        cy.contains('Custom Text').should('be.visible');
    });

    it('renders correctly with default props', () => {
        mount(<OpenInStudioButton />);
        cy.contains('Open in Studio').should('be.visible');
    });
});
