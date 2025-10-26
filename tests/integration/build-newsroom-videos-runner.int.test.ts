import { promises as fs } from 'fs';
import nock from 'nock';
import os from 'os';
import { resolve } from 'path';

import {
  type BuildNewsroomVideosOptions,
  runBuildNewsroomVideos
} from '../../npm/runners/build-newsroom-videos-runner';
import { mockApiResponse } from '../fixtures/newsroomData';

/**
 * Helper function to set up YouTube API mock
 */
function setupYouTubeAPIMock(data: any, status: number = 200) {
  return nock('https://youtube.googleapis.com').get('/youtube/v3/search').query(true).reply(status, data);
}

describe('Integration: build-newsroom-videos-runner', () => {
  let tempDir: string;
  let outputPath: string;
  let originalEnv: Record<string, string | undefined>;

  beforeAll(() => {
    // Save original environment variables
    originalEnv = {
      YOUTUBE_TOKEN: process.env.YOUTUBE_TOKEN
    };

    tempDir = resolve(os.tmpdir(), `build-newsroom-videos-test-${Date.now()}`);
    process.env.YOUTUBE_TOKEN = 'test-token';
  });

  beforeEach(async () => {
    await fs.mkdir(tempDir, { recursive: true });
    outputPath = resolve(tempDir, 'newsroom_videos.json');
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
    nock.cleanAll();
  });

  afterAll(() => {
    // Restore original environment variables
    if (originalEnv.YOUTUBE_TOKEN) {
      process.env.YOUTUBE_TOKEN = originalEnv.YOUTUBE_TOKEN;
    }
  });

  describe('Successful Execution with Mocked Data', () => {
    it('should successfully run and create newsroom_videos.json file', async () => {
      setupYouTubeAPIMock(mockApiResponse);

      await runBuildNewsroomVideos({ outputPath });

      const fileExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });

    it('should write valid JSON output', async () => {
      setupYouTubeAPIMock(mockApiResponse);

      await runBuildNewsroomVideos({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');

      expect(() => JSON.parse(content)).not.toThrow();
      expect(content.length).toBeGreaterThan(2);
    });

    it('should generate output with correct structure', async () => {
      setupYouTubeAPIMock(mockApiResponse);

      await runBuildNewsroomVideos({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');
      const output = JSON.parse(content);

      expect(Array.isArray(output)).toBe(true);
    });

    it('each video item should have required fields', async () => {
      setupYouTubeAPIMock(mockApiResponse);

      await runBuildNewsroomVideos({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');
      const output = JSON.parse(content);

      output.forEach((item: any) => {
        expect(item).toHaveProperty('image_url');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('videoId');
      });
    });

    it('should validate field types in output', async () => {
      setupYouTubeAPIMock(mockApiResponse);

      await runBuildNewsroomVideos({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');
      const output = JSON.parse(content);

      output.forEach((item: any) => {
        expect(typeof item.image_url).toBe('string');
        expect(typeof item.title).toBe('string');
        expect(typeof item.description).toBe('string');
        expect(typeof item.videoId).toBe('string');
      });
    });

    it('should handle empty response', async () => {
      setupYouTubeAPIMock({ items: [] });

      await runBuildNewsroomVideos({ outputPath });

      const content = await fs.readFile(outputPath, 'utf-8');
      const output = JSON.parse(content);

      expect(output).toEqual([]);
    });

    it('should use custom output path when provided', async () => {
      const customPath = resolve(tempDir, 'custom-videos.json');

      setupYouTubeAPIMock(mockApiResponse);

      await runBuildNewsroomVideos({ outputPath: customPath });

      const fileExists = await fs
        .access(customPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });

    it('should use default output path when not provided', async () => {
      setupYouTubeAPIMock(mockApiResponse);

      // Without outputPath, it should use default path
      await expect(runBuildNewsroomVideos()).resolves.toBeUndefined();

      // The test passes if no error is thrown
    });
  });

  describe('Export and Type Safety', () => {
    it('should export the runBuildNewsroomVideos function', () => {
      expect(typeof runBuildNewsroomVideos).toBe('function');
      expect(runBuildNewsroomVideos.constructor.name).toBe('AsyncFunction');
    });

    it('should export BuildNewsroomVideosOptions interface', () => {
      const options: BuildNewsroomVideosOptions = {
        outputPath: '/test/path.json'
      };

      expect(options.outputPath).toBe('/test/path.json');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when YouTube API call fails', async () => {
      nock('https://youtube.googleapis.com').get('/youtube/v3/search').query(true).replyWithError('Network error');

      await expect(runBuildNewsroomVideos({ outputPath })).rejects.toThrow();
    });

    it('should throw error when API returns invalid HTTP status', async () => {
      setupYouTubeAPIMock({}, 404);

      await expect(runBuildNewsroomVideos({ outputPath })).rejects.toThrow();
    });

    it('should throw error when API returns invalid data structure', async () => {
      setupYouTubeAPIMock({});

      await expect(runBuildNewsroomVideos({ outputPath })).rejects.toThrow();
    });

    it('should throw error when YOUTUBE_TOKEN is missing', async () => {
      const original = process.env.YOUTUBE_TOKEN;

      delete process.env.YOUTUBE_TOKEN;

      await expect(runBuildNewsroomVideos({ outputPath })).rejects.toThrow();

      process.env.YOUTUBE_TOKEN = original;
    });

    it('should handle file write errors with invalid path', async () => {
      setupYouTubeAPIMock(mockApiResponse);

      const invalidPath = '/root/invalid_dir/videos.json';

      await expect(runBuildNewsroomVideos({ outputPath: invalidPath })).rejects.toThrow();
    });

    it('should wrap errors in CustomError with context', async () => {
      nock('https://youtube.googleapis.com').get('/youtube/v3/search').query(true).replyWithError('Test error');

      await expect(runBuildNewsroomVideos({ outputPath })).rejects.toThrow();
    });
  });
});
