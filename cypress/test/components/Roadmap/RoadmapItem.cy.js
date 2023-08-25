import { mount } from '@cypress/react';
import RoadmapItem from '../../../../components/roadmap/RoadmapItem';

describe('RoadmapItem', () => {
  const item = {
    title: 'Sample Item',
    solutions: [{ title: 'Solution 1' }, { title: 'Solution 2' }],
    implementations: [
      { title: 'Implementation 1' },
      { title: 'Implementation 2' },
    ],
    description: 'Lorem ipsum dolor sit amet.',
  };

  it('renders the collapsed RoadmapItem correctly', () => {
    mount(<RoadmapItem item={item} colorClass="bg-blue-400" />);

    // Assert that the collapsed RoadmapItem is rendered correctly
    cy.get('[data-testid="RoadmapItem-list"]').should(
      'have.class',
      'border-l-2 border-dashed border-gray-300'
    );
    cy.contains('Sample Item').should('be.visible');
  });

  it('expands the RoadmapItem when clicked', () => {
    mount(<RoadmapItem item={item} colorClass="bg-blue-400" />);

    
    cy.get('[data-testid="RoadmapItem-button"]').click();

    // Assert that the expanded RoadmapItem is rendered correctly
    cy.get('[data-testid="RoadmapItem-list"]').should(
      'have.class',
      'border-l-2 border-dashed border-gray-300'
    );
    cy.contains('Sample Item').should('be.visible');
    cy.contains('Solution 1').should('be.visible');
    cy.contains('Solution 2').should('be.visible');
    cy.contains('Implementation 1').should('be.visible');
    cy.contains('Implementation 2').should('be.visible');
  });
  it('opens the description modal when clicked', () => {
    mount(<RoadmapItem item={item} colorClass="bg-blue-400" />);
    cy.contains('a', item.title).click();

    // Assert that the description modal is opened
    cy.contains(item.title).should('be.visible');
    cy.contains(item.description).should('be.visible');
    cy.contains(item.title).should('be.visible');
    cy.contains(item.description).should('be.visible');
  });
});
