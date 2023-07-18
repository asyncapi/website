import { mount } from "cypress/react";
import Feedback from '../../components/Feedback'
import MockRouter from '../../cypress/utils/router'
describe('Meeting component', () => {
    it('renders correctly with provided props', () => {
    
      mount(
      <MockRouter><Feedback/></MockRouter>
      );

 

    });
  });
  