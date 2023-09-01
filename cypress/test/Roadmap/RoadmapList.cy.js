import React from 'react';
import { mount } from 'cypress/react';
import RoadmapList from '../../../components/roadmap/RoadmapList';
describe('RoadmapList component', () => {
  const items = [
    { title: 'Item 1', description: 'Description 1' },
    { title: 'Item 2', description: 'Description 2' },
    { title: 'Item 3', description: 'Description 3' },
  ];
  it('renders the component with items', () => {
    mount(<RoadmapList items={items} />);
    //check if the length of list matches
    cy.get('[data-testid="RoadmapItem-list"]').should('have.length', items.length);
    cy.get('[data-testid="RoadmapList-list"]').should('exist');
    cy.get('[data-testid="RoadmapList-list"]').children().should('have.length', items.length);
  });

  it('renders the component with collapsed items', () => {
    mount(<RoadmapList items={items} collapsed={true} />);
    // check if collapsed items are 0
    cy.get('[data-testid="RoadmapItem-list"]').should('have.length',0);

    //component is rendered
    cy.get('[data-testid="RoadmapList-list"]').should('exist');

    //items are not rendered when collapsed
    cy.get('[data-testid="RoadmapList-list"]').children().should('not.exist');
  });
});
