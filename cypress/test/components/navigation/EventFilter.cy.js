// Import the mount function from @cypress/react
import { mount } from '@cypress/react';
import EventFilter from '../../../../components/navigation/EventFilter';
import { mockData } from '../../../fixtures/navigation-mock';

describe('EventFilter component', () => {
  // Define a variable to store the filtered data
  var filteredData;
  // Define a function to set the filtered data
  const setData = (mockData) => {
    filteredData = mockData;
  };

  beforeEach(() => {
    mount(<EventFilter data={mockData} setData={setData} />);
  });

  // Test the initial state of the component
  it('should render with All filter active by default', () => {
    cy.get('[data-testid="EventFilters-main"]').contains('All').should('have.class', 'bg-secondary-600');
    expect(filteredData.length).to.deep.equal(mockData.length);
  });

  // Test the Upcoming filter functionality
  it('should filter the upcoming events when Upcoming filter is clicked', () => {
    // Click on the Upcoming filter
    cy.get('[data-testid="EventFilters-main"]').contains('Upcoming').click({force:true});
    cy.get('[data-testid="EventFilters-main"]').contains('Upcoming').should('have.class', 'bg-secondary-600');
  });

  // Test the Recorded filter functionality
  it('should filter the recorded events when Recorded filter is clicked', () => {
    // Click on the Recorded filter
    cy.get('[data-testid="EventFilters-main"]').contains('Recorded').click();
    // Check if the Recorded filter is active
    cy.get('[data-testid="EventFilters-main"]').contains('Recorded').should('have.class', 'bg-secondary-600');
  });
});