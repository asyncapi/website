import MockApp from "../../../utils/mockApp";
import { mount } from "@cypress/react";
import NewsroomSection from '../../../../components/newsroom/NewsroomSection'

describe('Test for Newsroom Section Pages', () => {
 it('renders correctly', () => {
        mount(
            <MockApp>
             <NewsroomSection/>
            </MockApp>
           );
        
      });
});