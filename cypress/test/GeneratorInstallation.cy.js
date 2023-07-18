import { mount } from 'cypress/react';
import GeneratorInstallation from '../../components/GeneratorInstallation';

describe('GeneratorInstallation', () => {
    it('renders without errors', () => {
        mount(<GeneratorInstallation />);
    });
});