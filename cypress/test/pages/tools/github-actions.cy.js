
import GithubActionsPage from "../../../../pages/tools/github-actions";
import MockApp from "../../../utils/MockApp";
import {mount} from 'cypress/react';
describe('Test for Github Actions ', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <GithubActionsPage />
            </MockApp>
        );
    });
});