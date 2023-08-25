
import ParsersPage from "../../../../pages/tools/parsers";
import MockApp from "../../../utils/MockApp";
import {mount} from 'cypress/react';
describe('Test for Parsers', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <ParsersPage/>
            </MockApp>
        );
    });
});