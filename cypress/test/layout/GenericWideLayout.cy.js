import { mount } from 'cypress/react';
import MockRouter from '../../utils/router';
import GenericWideLayout from '../../../components/layout/GenericWideLayout';

describe('GenericWideLayout', () => {
  it('renders component correctly ', () => {
    cy.mount(
      <MockRouter asPath="/">
        <GenericWideLayout
          title="Test Title"
          description="Test Description"
          image="test-image.jpg"
          wide={false}
          hideBanner={true}
        />
      </MockRouter>
    );
  });
  it('throws error if any one prop is not found', () => {
    cy.mount(
      <MockRouter asPath="/">
        {' '}
        <GenericWideLayout
          title="Test Title"
          description="Test Description"
          wide={true}
          hideBanner={false}
        />
      </MockRouter>
    );
  });
});
