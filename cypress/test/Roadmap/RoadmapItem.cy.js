import React from 'react';
import { mount } from '@cypress/react';
import RoadmapItem from '../../../components/roadmap/RoadmapItem'

describe('RoadmapItem', () => {
  it('renders the component and displays item title', () => {
    const item = {
      title: 'Example Item',
      url: 'https://example.com',
      done: false,
      description: 'Lorem ipsum dolor sit amet.',
      solutions: [],
      implementations: [],
    };

    mount(<RoadmapItem item={item} colorClass="your-color-class" />);

    // Assert that the component is rendered
    cy.get('[data-testid="RoadmapItem-list"]').should('exist');

    // Assert that the item title is displayed correctly
    cy.contains('[data-testid="RoadmapItem-list"]', item.title).should('exist');
  });
});
