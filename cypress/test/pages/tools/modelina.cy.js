
import ModelinaPlaygroundPage from "../../../../pages/tools/modelina";
import MockApp from "../../../utils/MockApp";
import {mount} from 'cypress/react';
describe('Test for Modelina Pages', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <ModelinaPlaygroundPage/>
            </MockApp>
        );
    });
});