import { addDocButtons } from '../../scripts/build-docs';
import { docPosts, invalidTreePosts, mockDocPosts, mockTreePosts, treePosts } from '../fixtures/addDocButtonsData';

describe('addDocButtons', () => {
  it('should add next and previous page information', () => {
    const expectedFirstItem = {
      title: 'Welcome',
      slug: '/docs',
      content: 'Welcome content'
    };

    const expectedSecondItem = {
      isRootSection: true,
      title: 'Section 1'
    };

    const expectedThirdItem = {
      title: 'Page 1',
      slug: '/docs/section1/page1',
      nextPage: {
        title: 'Page 2',
        href: '/docs/section1/page2'
      },
      prevPage: {
        title: 'Section 1',
        href: undefined
      }
    };

    const expectedFourthItem = {
      title: 'Page 2',
      slug: '/docs/section1/page2',
      prevPage: {
        title: 'Page 1',
        href: '/docs/section1/page1'
      }
    };

    const result = addDocButtons(docPosts, treePosts);

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual(expectedFirstItem);
    expect(result[1]).toEqual(expectedSecondItem);
    expect(result[2]).toEqual(expectedThirdItem);
    expect(result[3]).toEqual(expectedFourthItem);
  });

  it('should set nextPage correctly when next item is a root element', () => {
    const result = addDocButtons(mockDocPosts, mockTreePosts);

    expect(result[1].nextPage).toBeDefined();
    expect(result[1].nextPage.title).toBe('Root 2 - Child 2');
    expect(result[1].nextPage.href).toBe('/docs/root2/child2');
  });

  it('should throw an error if treePosts is missing', () => {
    let error;

    try {
      addDocButtons(docPosts, undefined);
    } catch (err) {
      error = err;
      expect(err.message).toContain('An error occurred while adding doc buttons:');
    }
    expect(error).toBeDefined();
  });

  it('should throw an error if docPosts is missing', () => {
    let error;

    try {
      addDocButtons(undefined, treePosts);
    } catch (err) {
      error = err;
      expect(err.message).toContain('An error occurred while adding doc buttons:');
    }
    expect(error).toBeDefined();
  });

  it('should handle invalid data structure in treePosts', () => {
    let error;

    try {
      addDocButtons(docPosts, invalidTreePosts);
    } catch (err) {
      error = err;
      expect(err.message).toContain('An error occurred while adding doc buttons:');
    }
    expect(error).toBeDefined();
  });

  it('should handle non-Error object thrown in the function', () => {
    // Create a mock treePosts object that will cause a non-Error to be thrown
    const malformedTreePosts = { section1: {} };

    // Make section1 throw a non-Error when accessed
    Object.defineProperty(malformedTreePosts, 'section1', {
      get() {
        // eslint-disable-next-line no-throw-literal
        throw 'String exception';
      }
    });

    let error;
    try {
      addDocButtons(docPosts, malformedTreePosts);
    } catch (err) {
      error = err;
      expect(err.message).toBe('An unknown error occurred while adding doc buttons.');
    }
    expect(error).toBeDefined();
  });
});
