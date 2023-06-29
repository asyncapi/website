import React from 'react';
import { mount } from '@cypress/react';
import JobsContext from '../../../context/JobsContext';
import JobsLayout from '../../../components/layout/JobsLayout';

describe('JobsLayout', () => {
  it('renders JobsLayout component', () => {
    const post = {
      title: 'Test Job Title',

    };
   
    cy.stub(React, 'useContext').returns({
        post,
      });

    mount(
      <JobsContext.Provider value={{ post }}>
        <JobsLayout post={post}>
     
        </JobsLayout>
      </JobsContext.Provider>
    );

  });
});
