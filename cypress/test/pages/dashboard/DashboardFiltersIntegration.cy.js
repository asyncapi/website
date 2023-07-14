import React from 'react';
import { mount } from '@cypress/react';
import GoodFirstIssues from '../../../../components/dashboard/GoodFirstIssues';
import Table from '../../../../components/dashboard/table/Table';
import dashboardData from '../../../../dashboard.json';

describe('Integration test for Filters in Dashboard with json file', () => {
    const issues = dashboardData.goodFirstIssues;

    it('shows hot discussions from dashboard.json' ,() => {
        mount(<Table data={dashboardData.hotDiscussions} title={"Hot Topics"} />)
        cy.get('[data-testid="Row-spanText"]').each((row, index) => {
            cy.wrap(row).should('contain', dashboardData.hotDiscussions[index].title);
         });
    })

    it('filters issues based on selected repository & area', () => {
        mount(<GoodFirstIssues issues={issues} />);

        cy.get('[data-testid="Filters-img-container"]').click({force:true});
        
        // Select a repository and an area using the Filters component
        cy.get('[data-testid="Filter-menu"]').within(() => {
          cy.get('[data-testid="Select-form"]').eq(0).select('asyncapi/generator');
          cy.get('[data-testid="Select-form"]').eq(1).select('docs')
        });
        //check if selected is only displayed
        cy.contains('asyncapi/generator');
        cy.contains('docs')
        //check if this is not selected options are not displayed
        cy.should('not.contain','asyncapi/community');
        cy.should('not.contain','javascript');
    });
});