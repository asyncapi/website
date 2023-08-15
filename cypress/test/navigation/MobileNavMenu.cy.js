import { mount } from 'cypress/react'
import MobileNavMenu from '../../../components/navigation/MobileNavMenu';
describe('StickyNavbar', () => {
    it('renders the navbar with children and custom class', () => {
        mount(<MobileNavMenu ></MobileNavMenu>);
    });
});
