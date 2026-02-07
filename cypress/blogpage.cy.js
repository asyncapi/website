import BlogPage from './pages/BlogPage';

describe('Blog Page Tests', () => {
  const blog = new BlogPage();

  beforeEach(() => {
    blog.visit();
  });

  it('Navigation to blog page and verification of header', () => {
    blog.verifyHeader();
  });

  it('Verification of submit blog post link', () => {
    blog.verifySubmitLink();
  });

  it('Verification of RSS feed link and image', () => {
    blog.verifyRSSLink();
    blog.verifyRSSImage();
  });

  it('Verification of clear filters button', () => {
    blog.filterByType('Strategy');
    blog.verifyClearFiltersButton();
    blog.clickClearFilters();
    blog.verifyNoFilterButton();
  });

  it('Verification of filtered posts', () => {
    blog.filterByType('Engineering');
    blog.verifyFilteredPostsVisible();
  });

  it('Verification of specific post link, and checking post header', () => {
    blog.filterByType('Communication');
    blog.verifyPostLinkAndClick(
      /How TransferGo Adopted AsyncAPI/i,
      '/blog/transfergo-asyncapi-story',
    );
    blog.verifyPostHeader('How TransferGo adopted AsyncAPI');
  });

  it('Verification of filters by author and checking filtered posts appear', () => {
    blog.filterByFirstAvailableAuthor();
    blog.verifyFilteredPostsVisible();
  });

  it('Verification of filters by author, clicking a post, and verifying post detail page loads', () => {
    blog.filterByFirstAvailableAuthor();
    blog.verifyFilteredPostsVisible();
    blog.clickFirstVisiblePost();
    blog.verifyPostDetailPageLoaded();
  });

  it('Verification of filters by tag and checking filtered posts appear', () => {
    blog.filterByFirstAvailableTag();
    blog.verifyFilteredPostsVisible();
  });

  it('Verification of filters by tag, clicking a post, and verifying post detail page loads', () => {
    blog.filterByFirstAvailableTag();
    blog.verifyFilteredPostsVisible();
    blog.clickFirstVisiblePost();
    blog.verifyPostDetailPageLoaded();
  });
});
