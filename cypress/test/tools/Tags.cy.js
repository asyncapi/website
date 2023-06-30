import React from 'react';
import { mount } from 'cypress/react';
import SelectTags from '../../../components/tools/Tags';

describe('SelectTags', () => {
    it('renders the component with the provided props', () => {
      const name = 'Tag 1';
      const bgColor = 'white';
      const borderColor = 'border-blue-500';
  
      mount(
        <SelectTags name={name} bgColor={bgColor} borderColor={borderColor} />
      );
      cy.get('[data-testid="Tags-div"]') .should('have.class', bgColor).should('have.class', borderColor).contains(name);
    });
  });