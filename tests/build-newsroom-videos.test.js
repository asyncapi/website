const { readFileSync, removeSync, mkdirpSync, outputFileSync } = require('fs-extra');
const { resolve, join } = require('path');
const { buildNewsroomVideos } = require('../scripts/build-newsroom-videos');
const { mockApiResponse, expectedResult } = require('./fixtures/newsroomData');
const fetch = require('node-fetch-2');
const os = require('os');

jest.mock('node-fetch-2', () => jest.fn());

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
        fetch.mockClear();
    });

    it('should fetch video data and write to file', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockApiResponse),
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

        expect(fetch).toHaveBeenCalledWith(expectedUrl.toString());
        const response = readFileSync(testFilePath, 'utf8');
        expect(response).toEqual(expectedResult);
        expect(result).toEqual(expectedResult);
    });

    it('should handle fetch errors', async () => {
        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await buildNewsroomVideos(testFilePath);
        } catch (err) {
            expect(err.message).toContain('Fetch error');
        }
    });

    it('should handle invalid API response', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        });

        try {
            await buildNewsroomVideos(testFilePath);
        } catch (err) {
            expect(err.message).toContain('Invalid data structure received from YouTube API');
        }
    });

    it('should handle HTTP status code', async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 404,
            json: jest.fn().mockResolvedValue({}),
        });

        try {
            await buildNewsroomVideos(testFilePath);
        } catch (err) {
            expect(err.message).toContain('HTTP error! with status code: 404');
        }
    });

    it('should handle file write errors', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockApiResponse),
        });

        const invalidPath = resolve(os.tmpdir(), 'invalid_dir', 'newsroom_videos.json');

        try {
            await buildNewsroomVideos(invalidPath);
        } catch (err) {
            expect(err.message).toMatch(/ENOENT|EACCES/);
        }
    });
});
