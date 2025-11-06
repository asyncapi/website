import BlogPage from './pages/blog';

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
    blog.filterByAuthor('Akshat Nema');
    blog.verifyFilteredPostsVisible();
  });

  it('User filters by author, verifies specific post link, and checks post header', () => {
    blog.filterByAuthor('Akshat Nema');
    blog.verifyPostLinkAndClick(
      /New Tools Dashboard for AsyncAPI/i,
      '/blog/new-asyncapi-tools-page',
    );
    blog.verifyPostHeader('New Tools Dashboard for AsyncAPI');
  });

  it('User filters by tag and verifies filtered posts appear', () => {
    blog.filterByTag('Avro');
    blog.verifyFilteredPostsVisible();
  });

  it('User filters by tag, verifies specific post link, and checks post header', () => {
    blog.filterByTag('Avro');
    blog.verifyPostLinkAndClick(
      /AsyncAPI and Apicurio for Asynchronous APIs/i,
      '/blog/asyncapi-and-apicurio-for-asynchronous-apis',
    );
    blog.verifyPostHeader('AsyncAPI and Apicurio for Asynchronous APIs');
  });
});
