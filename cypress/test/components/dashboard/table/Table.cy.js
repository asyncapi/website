import { mount } from 'cypress/react';
import Table from '../../../../../components/dashboard/table/Table';

describe('Table Component', () => {
  const data = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
  ];

  it('renders the component', () => {
    mount(
      <Table
        title="My Table"
        data={data}
        className="test-class"
        listClassName="test-list-class"
      />
    );

    cy.contains('h2', 'My Table').should('be.visible');
  });

  it('renders the correct item names', () => {
    mount(
      <Table
        title="My Table"
        data={data}
        className="test-class"
        listClassName="test-list-class"
      />
    );
  
    cy.get('.test-list-class').should('be.visible');
  
    cy.get('.test-list-class [data-testid="Row-spanText"]').each((row, index) => {
       cy.wrap(row).should('contain', data[index].title);
    });
  });
  
  
})
