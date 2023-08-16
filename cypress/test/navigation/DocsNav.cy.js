import React from 'react';
import { mount } from 'cypress/react';
import DocsNav from '../../../components/navigation/DocsNav';
import MockRouter from '../../utils/router';
import { Docsitem } from '../../fixtures/navigation-mock';

describe('DocsNav', () => {
  it('renders the nav items with the correct styles and icons', () => {
    const active = '/getting-started/installation';
    mount(
    <MockRouter> <DocsNav item={Docsitem} active={active}  /></MockRouter>
   );

 
  });
});
