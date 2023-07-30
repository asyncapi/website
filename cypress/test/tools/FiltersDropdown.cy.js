import { mount } from 'cypress/react';
import FiltersDropdown from '../../../components/tools/FiltersDropdown';

describe('FiltersDropdown', () => {
  const dataList = [
    { name: 'Option 1' },
    { name: 'Option 2' },
    { name: 'Option 3' },
  ];

  it('should toggle options when clicked', () => {
    const checkedOptions = [];
    const setStateFunction = cy.stub().as('setStateFunction');

    mount(
      <FiltersDropdown
        dataList={ dataList }
        checkedOptions={ checkedOptions }
        setStateFunction={ setStateFunction }
      />
    );

    cy.get('[data-testid="FiltersDropdown-div"] > :nth-child(1)').click({force:true});
    cy.get('@setStateFunction').should('have.been.calledOnceWith', ['Option 1']);

    cy.get('[data-testid="FiltersDropdown-div"] > :nth-child(2)').click({force:true});
    cy.get('@setStateFunction').should('have.been.calledWith', ['Option 2']);
  });
});
