import { mkdirpSync, outputFileSync, readFileSync, removeSync } from 'fs-extra';
// Get reference to the mocked fetch function
import fetch from 'node-fetch-2';
import os from 'os';
import { join, resolve } from 'path';

import { buildNewsroomVideos } from '../scripts/build-newsroom-videos';
import { expectedResult, mockApiResponse } from './fixtures/newsroomData';

// Place jest.mock at the top before any variable declarations
jest.mock('node-fetch-2', () => {
  return jest.fn();
});
const mockFetch = fetch as jest.Mock;

describe('buildNewsroomVideos', () => {
  const testDir = join(os.tmpdir(), 'test_config');
  const testFilePath = resolve(testDir, 'newsroom_videos.json');

  beforeAll(() => {
    mkdirpSync(testDir);
    outputFileSync(testFilePath, JSON.stringify({}));
    process.env.YOUTUBE_TOKEN = 'testkey';
  });

  afterAll(() => {
    removeSync(testDir);
  });

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should mockFetch video data and write to file', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApiResponse)
    });

    const result = await buildNewsroomVideos(testFilePath);

    const expectedUrl = new URL('https://youtube.googleapis.com/youtube/v3/search');

    expectedUrl.searchParams.set('key', 'testkey');
    expectedUrl.searchParams.set('part', 'snippet');
    expectedUrl.searchParams.set('channelId', 'UCIz9zGwDLbrYQcDKVXdOstQ');
    expectedUrl.searchParams.set('eventType', 'completed');
    expectedUrl.searchParams.set('type', 'video');
    expectedUrl.searchParams.set('order', 'Date');
    expectedUrl.searchParams.set('maxResults', '5');

    expect(mockFetch).toHaveBeenCalledWith(expectedUrl.toString());
    const response = readFileSync(testFilePath, 'utf8');

    expect(response).toEqual(expectedResult);
    expect(result).toEqual(expectedResult);
  });

  it('should handle mockFetch errors', async () => {
    mockFetch.mockRejectedValue(new Error('mockFetch error'));

    try {
      await buildNewsroomVideos(testFilePath);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toContain('mockFetch error');
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });

  it('should handle invalid API response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({})
    });

    try {
      await buildNewsroomVideos(testFilePath);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toContain('Invalid data structure received from YouTube API');
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });

  it('should handle HTTP status code', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValue({})
    });

    try {
      await buildNewsroomVideos(testFilePath);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toContain('HTTP error! with status code: 404');
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });

  it('should handle file write errors', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApiResponse)
    });

    const invalidPath = resolve(os.tmpdir(), 'invalid_dir', 'newsroom_videos.json');

    try {
      await buildNewsroomVideos(invalidPath);
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).toMatch(/ENOENT|EACCES/);
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });

  it('should throw an error if YOUTUBE_TOKEN environment variable is not set', async () => {
    delete process.env.YOUTUBE_TOKEN;
    await expect(buildNewsroomVideos('/path/to/write')).rejects.toThrow(
      'YOUTUBE_TOKEN environment variable is required'
    );
    process.env.YOUTUBE_TOKEN = 'testkey';
  });
});
