/* eslint-disable cypress/no-async-tests */
import { buildCaseStudiesList } from '../../../../scripts/casestudies/index';

describe('Newsroom Videos', () => {
  it('fetches and saves newsroom videos', async () => {
    const caseStudiesList = await buildCaseStudiesList();
    cy.expect(caseStudiesList).to.exist;
  });
});
