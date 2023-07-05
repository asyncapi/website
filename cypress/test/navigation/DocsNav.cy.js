import React from 'react';
import { mount } from 'cypress/react';
import DocsNav from '../../../components/navigation/DocsNav';

describe('DocsNav', () => {
  it('renders the navigation menu correctly', () => {
    const item = {
      item: {
        title: 'Category',
        rootSectionId: 'concepts',
        slug:'/docs/concepts' // Replace with the appropriate rootSectionId
      },
      children: [
        {
          item: {
            title: 'Subcategory',
          },
          children: [
            {
              title: 'Subitem',
            },
          ],
        },
      ],
    };
    const activeSlug = '/docs/concepts'; // Replace with the appropriate activeSlug value

    mount(
      <DocsNav
        item={item}
        active={activeSlug}
        onClick={() => {}}
      />
    );
  });
});
