import {mount } from '@cypress/react'
import MenuBlocks from '../../../components/navigation/MenuBlocks';
import StickyNavbar from '../../../components/navigation/StickyNavbar';

describe('TutorialList', () => {
    it('renders tutorial items correctly', () => {
      mount(
           <StickyNavbar/>
  );
      // Add assertions to check the rendered output
    });
  });