import Toolsdashboard from "../../../../pages/tools";
import MockApp from "../../../utils/MockApp";
import {mount} from 'cypress/react';
describe('Test for Tools Dashboard', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <Toolsdashboard/>
            </MockApp>
        );
    });
});