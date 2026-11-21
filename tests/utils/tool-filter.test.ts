import { normalizeArrayQuery, normalizeBooleanQuery, normalizeStringQuery } from '../../utils/tool-filter';

describe('tool-filter query normalizers', () => {
  describe('normalizeArrayQuery', () => {
    it('handles single string with comma-separated values', () => {
      expect(normalizeArrayQuery('Java,Python,Go')).toEqual(['Java', 'Python', 'Go']);
    });

    it('handles single value string without commas', () => {
      expect(normalizeArrayQuery('JavaScript')).toEqual(['JavaScript']);
    });

    it('handles repeated query parameter as an array', () => {
      expect(normalizeArrayQuery(['Java', 'Python'])).toEqual(['Java', 'Python']);
    });

    it('handles array containing comma-separated elements', () => {
      expect(normalizeArrayQuery(['Java,Python', 'Go,Rust'])).toEqual(['Java', 'Python', 'Go', 'Rust']);
    });

    it('trims whitespace around values and ignores empty segments', () => {
      expect(normalizeArrayQuery('  Java ,  , Python ')).toEqual(['Java', 'Python']);
    });

    it('returns empty array for undefined', () => {
      expect(normalizeArrayQuery(undefined)).toEqual([]);
    });

    it('returns empty array for empty string', () => {
      expect(normalizeArrayQuery('')).toEqual([]);
    });

    it('returns empty array for array of empty strings', () => {
      expect(normalizeArrayQuery(['', '   '])).toEqual([]);
    });
  });

  describe('normalizeStringQuery', () => {
    it('returns string value when provided', () => {
      expect(normalizeStringQuery('free', 'all')).toBe('free');
    });

    it('returns first element when query is an array', () => {
      expect(normalizeStringQuery(['free', 'paid'], 'all')).toBe('free');
    });

    it('returns default value when query is undefined', () => {
      expect(normalizeStringQuery(undefined, 'all')).toBe('all');
    });

    it('returns default value when query is empty string', () => {
      expect(normalizeStringQuery('', 'all')).toBe('all');
    });
  });

  describe('normalizeBooleanQuery', () => {
    it('returns true for "true" string', () => {
      expect(normalizeBooleanQuery('true')).toBe(true);
    });

    it('returns false for "false" string', () => {
      expect(normalizeBooleanQuery('false')).toBe(false);
    });

    it('returns true when query is an array starting with "true"', () => {
      expect(normalizeBooleanQuery(['true', 'true'])).toBe(true);
    });

    it('returns false for undefined or empty input', () => {
      expect(normalizeBooleanQuery(undefined)).toBe(false);
      expect(normalizeBooleanQuery('')).toBe(false);
    });
  });
});
