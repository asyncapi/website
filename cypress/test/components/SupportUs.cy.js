import SupportUs from '../../../components/SupportUs/SupportUs';
describe('SupportUs component', () => {
  beforeEach(() => {
    cy.mount(<SupportUs />);
  });

  it('renders the SupportUs component', () => {
    cy.get('[data-testid="SupportUs-main"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="SupportUs-section"]').should('exist'); // First section div
        cy.get('[data-testid="SupportUs-subsection"]').should('exist'); // Second section div
        cy.get('[data-testid="SupportUs-last-div"]').should('exist'); // Third section div
      });
  });

  it('renders correct number of items in each section', () => {
    cy.get('[data-testid="SupportUs-section"]').find('a').should('have.length', 3); // First section
    cy.get('[data-testid="SupportUs-subsection"]').find('a').should('have.length', 3); // Second section
    cy.get('[data-testid="SupportUs-last-div"]').find('a').should('have.length', 1); // Third section
  });

  it('opens links in new tab', () => {
    cy.get('[data-testid="SupportUs-main"]').each((section) => {
      cy.wrap(section)
        .find('a')
        .each((link) => {
          cy.wrap(link).should('have.attr', 'target', '_blank');
        });
    });
  });

  it('has valid href attribute in each link', () => {
    cy.get('[data-testid="SupportUs-main"]').each((section) => {
      cy.wrap(section)
        .find('a')
        .each((link) => {
          cy.wrap(link).should('have.attr', 'href').and('not.be.empty');
        });
    });
  });

  it('displays the correct image in each item', () => {
    cy.get('[data-testid="SupportUs-main"]').each((section) => {
      cy.wrap(section)
        .find('a')
        .each((link) => {
          cy.wrap(link).find('img').should('have.attr', 'src').and('not.be.empty');
        });
    });
  });

});
