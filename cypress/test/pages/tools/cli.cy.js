import CliPage from "../../../../pages/tools/cli";
import MockApp from "../../../utils/MockApp";
import {mount} from 'cypress/react';
describe('Test for cli tools ', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <CliPage />
            </MockApp>
        );
    });
});