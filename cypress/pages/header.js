
import BasePage from './BaseHeaderPage';

class Header extends BasePage {
  verifyDropdownSections(navItemName) {
    this.getElement('[data-testid="Navbar-main"] a')
      .contains(navItemName)
      .should('be.visible')
      .trigger('mouseover');
    this.getElement('[data-testid="Flyout-main"]').should('exist').and('be.visible');
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
