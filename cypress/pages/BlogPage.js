import BasePage from './BasePage';

class BlogPage extends BasePage {
  verifyPageLoaded() {
    this.verifyHeadingExists('Welcome to our blog!');
  }

  verifyHeader() {
    this.verifyPageLoaded();
  }
}

export default BlogPage;
