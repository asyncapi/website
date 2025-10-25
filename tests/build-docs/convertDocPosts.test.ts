import { convertDocPosts } from '../../scripts/build-docs';
import {
  docObject,
  emptyDocObject,
  nestedChildrenDocObject,
  singlePostDocObject
} from '../fixtures/convertDocPostData';

describe('convertDocPosts', () => {
  it('should convert a doc object to an array', () => {
    const result = convertDocPosts(docObject);

    expect(result).toHaveLength(3);
    expect(result[0].title).toBe('Root');
    expect(result[1].title).toBe('Child 1');
    expect(result[2].title).toBe('Child 2');
  });

  it('should return an array with an empty object for an empty doc object', () => {
    const result = convertDocPosts(emptyDocObject);

    expect(result).toEqual([{}]);
  });

  it('should handle a doc object with no children', () => {
    const result = convertDocPosts(singlePostDocObject);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Single Post');
  });

  it('should handle nested children', () => {
    const result = convertDocPosts(nestedChildrenDocObject);

    expect(result).toHaveLength(4);
    expect(result[0].title).toBe('Root');
    expect(result[1].title).toBe('Child 1');
    expect(result[2].title).toBe('Grandchild 1');
    expect(result[3].title).toBe('Child 2');
  });

  it('should throw an error if docObject is undefined', () => {
    let error;

    try {
      convertDocPosts(undefined as any);
    } catch (err) {
      error = err;
      expect((err as Error).message).toContain('Error in convertDocPosts:');
    }
    expect(error).toBeDefined();
  });

  it('should throw an error if docObject is null', () => {
    let error;

    try {
      convertDocPosts(null as any);
    } catch (err) {
      error = err;
      expect((err as Error).message).toContain('Error in convertDocPosts:');
    }
    expect(error).toBeDefined();
  });
});
