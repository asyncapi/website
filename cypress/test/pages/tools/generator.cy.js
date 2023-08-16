
import GeneratorPage from "../../../../pages/tools/generator";
import MockApp from "../../../utils/MockApp";
import {mount} from 'cypress/react';
describe('Test for generator tools', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <GeneratorPage />
            </MockApp>
        );
    });
});