import { mount } from 'cypress/react';
import Row from '../../../../components/layout/Row';

describe('Row', () => {
  it('renders children correctly', () => {
    const children = <p>Sample content</p>;
    mount(<Row>{children}</Row>);
    cy.contains('Sample content').should('exist');
  });
});
