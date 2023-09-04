import { buildNavTree } from '../../../scripts/build-docs';
import { convertDocPosts } from '../../../scripts/build-docs';
import { addDocButtons } from '../../../scripts/build-docs';
import { mockNavItems, expectedTree, mockDocObject, expectedDocsArray, mockDocPosts, mockTreePosts, expectedStructuredPosts, mockTreePostsOneRoot, mockDocPostsOneRoot, expectedStructuredPostsOneRoot } from '../../fixtures/MockData-scripts';


describe('buildNavTree function', () => {
  it('should return a tree object with the correct structure and order of nav items', () => {
    // call the function with the mock data
    const actualTree = buildNavTree(mockNavItems);
    expect(actualTree).to.deep.equal(expectedTree);
  });

});

describe('convertDocPosts function', () => {
  it('should return an array of doc posts with the correct order and properties', () => {
    // call the function with the mock data
    const actualDocsArray = convertDocPosts(mockDocObject);
    // assert that the actual array matches the expected array
    expect(actualDocsArray).to.deep.equal(expectedDocsArray);
  });
});

describe('addDocButtons function', () => {

  it('should return an array of structured posts with the correct next and prev page buttons', () => {

    // call the function with the mock data
    const actualStructuredPosts = addDocButtons(mockDocPosts, mockTreePosts);
    // assert that the actual array matches the expected array
    expect(actualStructuredPosts).to.deep.equal(expectedStructuredPosts);

  });

  // a second test case for when there is only one root section and no subsections
  it('should return an array of structured posts with the correct next and prev page buttons when there is only one root section and no subsections', () => {

    // call the function with the new mock data
    const actualStructuredPostsOneRoot = addDocButtons(mockDocPostsOneRoot, mockTreePostsOneRoot);

    // assert that the actual array matches the expected array
    expect(actualStructuredPostsOneRoot).to.deep.equal(expectedStructuredPostsOneRoot);

  });
});