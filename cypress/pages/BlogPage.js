import BasePage from './BasePage';

class BlogPage extends BasePage {
  verifyPageLoaded() {
    this.verifyHeadingExists('Welcome to our blog!');
  }
}

export default BlogPage;
