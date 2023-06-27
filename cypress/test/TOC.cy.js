import { mount } from '@cypress/react';
import TOC from '../../components/TOC';

describe('TOC', () => {
  const toc = [
    {
      lvl: 1,
      content: '<h1>Introduction</h1>',
      slug: 'introduction',
      slugWithATag: 'introduction',
    },
    {
      lvl: 2,
      content: '<h2>Getting Started</h2>',
      slug: 'getting-started',
      slugWithATag: 'getting-started',
    },
    {
      lvl: 2,
      content: '<h2>Installation</h2>',
      slug: 'installation',
      slugWithATag: 'installation',
    },
    {
      lvl: 3,
      content: '<h3>Step 1: Download</h3>',
      slug: 'step-1-download',
      slugWithATag: 'step-1-download',
    },
    {
      lvl: 3,
      content: '<h3>Step 2: Install Dependencies</h3>',
      slug: 'step-2-install-dependencies',
      slugWithATag: 'step-2-install-dependencies',
    },
  ];
  it('renders the TOC correctly with empty content', () => {
    mount(<TOC toc={[]} />);

    cy.get('.hidden').should('not.exist');
  });
  it('renders the TOC correctly', () => {
    mount(<TOC toc={toc} />);

    // Add assertions to verify the rendering of TOC items
    cy.get('[data-testid="TOC-Heading"]').should('contain', 'On this page');
    cy.get('[data-testid="TOC-Link"]').should('have.length', toc.length);
  });

  it('expands and collapses the TOC on click', () => {
    mount(<TOC toc={toc} />);

    // Verify initial state
    cy.get('.hidden').should('exist'); // TOC content should be hidden

    // Click on the TOC header
    cy.get('[data-testid="TOC-Heading"]').click();

    // Verify expanded state
    cy.get('.hidden').should('not.exist'); // TOC content should be visible

    // Click again on the TOC header
    cy.get('[data-testid="TOC-Heading"]').click();

    // Verify collapsed state
    cy.get('.hidden').should('exist'); // TOC content should be hidden
  });
  

  });
