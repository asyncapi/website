import { mount } from 'cypress/react'
import MobileNavMenu from '../../../components/navigation/MobileNavMenu';
describe('MobileNavMenu', () => {
    it('renders the Mobile Nav Menu', () => {
        mount(<MobileNavMenu />);
    });
});
