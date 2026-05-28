import BasePage from './BasePage';

class CaseStudiesPage extends BasePage {
  verifyPageLoaded() {
    this.verifyHeadingExists('Case Studies');
  }
}

export default CaseStudiesPage;
