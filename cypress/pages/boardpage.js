import BasePage from './BasePage';

class BoardPage extends BasePage {
  visitBoardPage() {
    this.visit('/community/board');
  }

  verifyMemberCards() {
    return cy.get('[data-testid="board-members"] h3').should('have.length.at.least', 1);
  }
}

export default BoardPage;
