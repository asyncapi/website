class Header {
  visit() {
    cy.visit('/');
  }
  
  verifyDropdownSections(navItemName) {
    cy.get(`[data-testid="Navbar-main"] a`)
      .contains(navItemName)
      .trigger('mouseover');
    cy.get(`[data-testid="Flyout-main"]`).should('be.visible');
  }

  verifyDocsDropdown() {
    this.verifyDropdownSections('Docs');
  }

  verifyToolsDropdown() {
    this.verifyDropdownSections('Tools');
  }

  verifyCommunityDropdown() {
    this.verifyDropdownSections('Community');
  }
}

export default Header;
