
import BasePage from './basepageheader';

class Header extends BasePage {
  verifyDropdownSections(navItemName) {
    this.getElement('[data-testid="Navbar-main"] a')
      .contains(navItemName)
      .trigger('mouseover');
    this.getElement('[data-testid="Flyout-main"]').should('be.visible');
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
