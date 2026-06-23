import BlogPage from './pages/BlogPage';

describe('Blog Page Tests', () => {
  const blog = new BlogPage();

  beforeEach(() => {
    blog.visit();
  });

  it('Navigation to blog page and verification of header', () => {
    blog.verifyHeader();
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
    blog.verifyFilteredPostsVisible();
    blog.clickFirstVisiblePost();
    blog.verifyPostDetailPageLoaded();
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
