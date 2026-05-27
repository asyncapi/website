import BasePage from './BasePage';

class CommunityPage extends BasePage {
  verifyPageLoaded() {
    this.verifyHeadingExists('Home of #CommunityOps');
  }
}

export default CommunityPage;