import BlogPage from './pages/BlogPage';

describe('Blog Page Tests', () => {
  const blog = new BlogPage();

  beforeEach(() => {
    blog.visit();
  });

  it('User navigates to blog and verifies header', () => {
    blog.verifyHeader();
  });

  it('User verifies submit blog post link', () => {
    blog.verifySubmitLink();
  });

  it('User verifies RSS feed link and image', () => {
    blog.verifyRSSLink();
    blog.verifyRSSImage();
  });

  it('User verifies clear filters button works', () => {
    blog.filterByType('Strategy');
    blog.verifyClearFiltersButton();
    blog.clickClearFilters();
    blog.verifyNoFilterButton();
  });

  it('User filters by type and verifies filtered posts appear', () => {
    blog.filterByType('Engineering');
    blog.verifyFilteredPostsVisible();
  });

  it('User filters by type, verifies specific post link, and checks post header', () => {
    blog.filterByType('Communication');
    blog.verifyPostLinkAndClick(
      /How TransferGo Adopted AsyncAPI/i,
      '/blog/transfergo-asyncapi-story',
    );
    blog.verifyPostHeader('How TransferGo adopted AsyncAPI');
  });

  it('User filters by author and verifies filtered posts appear', () => {
    blog.filterByFirstAvailableAuthor();
    blog.verifyFilteredPostsVisible();
  });

  it('User filters by author, clicks a post, and verifies post detail page loads', () => {
    blog.filterByFirstAvailableAuthor();
    blog.verifyFilteredPostsVisible();
    blog.clickFirstVisiblePost();
    blog.verifyPostDetailPageLoaded();
  });

  it('User filters by tag and verifies filtered posts appear', () => {
    blog.filterByFirstAvailableTag();
    blog.verifyFilteredPostsVisible();
  });

  it('User filters by tag, clicks a post, and verifies post detail page loads', () => {
    blog.filterByFirstAvailableTag();
    blog.verifyFilteredPostsVisible();
    blog.clickFirstVisiblePost();
    blog.verifyPostDetailPageLoaded();
  });
});
