import { mount } from '@cypress/react';
import RoadmapColumn from '../../../../components/roadmap/RoadmapColumn';
import RoadmapList from '../../../../components/roadmap/RoadmapList';

describe('RoadmapColumn Component', () => {
  it('renders the RoadmapColumn component with title and description', () => {
    const title = 'Test RoadmapColumn';
    const description = 'This is a test RoadmapColumn';
    const colorClass = 'blue';
    const items = [];
    const childrenCollapsed = false;
    mount(
      <RoadmapColumn
        title={title}
        description={description}
        colorClass={colorClass}
        items={items}
        childrenCollapsed={childrenCollapsed}
      />
    );
    cy.get('[data-testid="RoadmapColumn-heading"]').contains('h3',title).should('exist');
    cy.get('[data-testid="RoadmapColumn-heading"]').contains('p',description).should('exist');
  });

  it('renders the RoadmapList component within RoadmapColumn', () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    mount(
      <RoadmapColumn
        title="Dummy Test"
        description="This is a test for RoadmapColumn"
        colorClass="red"
        items={items}
        childrenCollapsed={false}
      />
    );
    //renders RoadmapList component
    cy.get(RoadmapList).should('exist');
    
  });

  it('renders the correct number of items in RoadmapList' , () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    mount(
      <RoadmapColumn
        title="Test RoadmapColumn"
        description="This is a test RoadmapColumn"
        colorClass="red"
        items={items}
        childrenCollapsed={false}
      />
    );
    cy.get('[data-testid="RoadmapItem-list"]').should('have.length', items.length);
  })

});

