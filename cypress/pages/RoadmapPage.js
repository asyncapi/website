import BasePage from './BasePage';

class RoadmapPage extends BasePage {
  verifyPageLoaded() {
    this.verifyHeadingExists('AsyncAPI becomes the #1 API specification for defining and developing APIs.');
  }
}

export default RoadmapPage;
