import { mount } from 'cypress/react';
import Select from '../../../../components/form/Select';

describe('Select Component', () => {
  const options = [
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' },
    { value: 'option3', text: 'Option 3' },
  ];

  it('should call onChange when an option is selected', () => {
    const onChange = cy.stub().as('onChange');
    mount(<Select onChange={onChange} options={options} />);

    cy.get('[data-testid="Select-form"]').select('option2');
    cy.get('@onChange').should('be.calledOnceWith', 'option2');
  });

  it('should render options correctly', () => {
    mount(<Select options={options} selected="option2" />);

    cy.get('[data-testid="Select-form"]')
      .find('[data-testid="Option-form"]')
      .should(($options) => {
        expect($options).to.have.length(3);

        const optionValues = $options.map((_, el) => Cypress.$(el).val()).get();
        expect(optionValues).to.deep.eq(['option1', 'option2', 'option3']);

        const selectedOption = $options.filter(':selected');
        expect(selectedOption).to.have.length(1);
        expect(selectedOption.text()).to.eq('Option 2');
      });
  });
});
