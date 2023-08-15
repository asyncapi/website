import React from 'react';
import { mount } from 'cypress/react';
import DocsNav from '../../../components/navigation/DocsNav';
import MockRouter from '../../utils/router';

describe('DocsNav', () => {
  it('renders the nav items with the correct styles and icons', () => {

    const item = {
      item: {
        title: 'Getting Started',
        rootSectionId: 'welcome',
        slug: '/getting-started',
      },
      children: [
        {
          item: {
            title: 'Installation',
            slug: '/getting-started/installation',
          },
        },
        {
          item: {
            title: 'Writing Your First Test',
            slug: '/getting-started/writing-your-first-test',
          },
        },
      ],
    };
    const active = '/getting-started/installation';
    mount(
    <MockRouter> <DocsNav item={item} active={active}  /></MockRouter>
   );

 
  });
});
