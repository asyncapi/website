import BasePage from './BasePage';
class ToolsPage extends BasePage {
  visitToolsPage() {
    super.visit('/tools');
  }

  verifyPageLoaded() {
    this.verifyHeadingExists('Tools');
  }

  verifyHeader() {
    this.verifyPageLoaded();
  }

  verifyToolLink(href, heading, linkType) {
    const linkTexts = {
      website: 'Visit Website',
      github: 'View Github',
      docs: 'Visit Docs',
    };

    this.getLink(href, linkTexts[linkType])
      .parents('.rounded-lg.border.shadow-md')
      .first()
      .within(() => {
        this.verifyHeadingExists(heading);
      });
  }
}
export default ToolsPage;
