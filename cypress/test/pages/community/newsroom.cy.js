import MockApp from "../../../utils/MockApp";
import { mount } from "@cypress/react";
import NewsroomSection from '../../../../pages/community/newsroom'

describe('Test for Newsroom Section Pages', () => {
    it('renders correctly', () => {
        mount(
            <MockApp>
                <NewsroomSection />
            </MockApp>
        );
    });
});