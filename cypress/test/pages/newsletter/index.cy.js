import NewsletterIndexPage from "../../../../pages/newsletter";
import MockApp from "../../../utils/MockApp";
import {mount} from 'cypress/react';
describe('Test for Newsletter', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <NewsletterIndexPage/>
            </MockApp>
        );
    });
});