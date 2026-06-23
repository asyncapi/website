import BasePage from './BasePage';

class RoadmapPage extends BasePage {
  verifyPageLoaded() {
    this.verifyHeadingExists('AsyncAPI: The #1 API Specification');
  }
}

export default RoadmapPage;
