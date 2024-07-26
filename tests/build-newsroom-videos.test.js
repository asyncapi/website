const { buildNewsroomVideos } = require('../scripts/build-newsroom-videos');
const fetch = require('node-fetch-2');
const { resolve } = require('path');
const { mkdirSync, readFileSync, rmSync } = require('fs');
const { mockApiResponse, expectedResult } = require('./fixtures/newsroomData');

const testDir = resolve(__dirname, 'test_config');
const testFilePath = resolve(testDir, 'newsroom_videos.json');

jest.mock('node-fetch-2', () => jest.fn());

describe('buildNewsroomVideos', () => {
    beforeEach(() => {
        fetch.mockClear();
        process.env.YOUTUBE_TOKEN = 'testkey';

        mkdirSync(testDir, { recursive: true });
    });

    afterEach(() => {
        rmSync(testDir, { recursive: true, force: true });
    });

    it('should fetch video data and write to file', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockApiResponse),
        });

        const result = await buildNewsroomVideos(testFilePath);

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('https://youtube.googleapis.com/youtube/v3/search?'));
        
        const response = readFileSync(testFilePath, 'utf8');
        expect(response).toEqual(expectedResult);

        expect(result).toEqual(expectedResult);
    });

    it('should handle fetch errors', async () => {
        fetch.mockRejectedValue(new Error('Fetch error'));

        await expect(buildNewsroomVideos(testFilePath)).rejects.toThrow('Failed to build newsroom videos: Fetch error');
    });

    it('should handle invalid API response', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        });

        await expect(buildNewsroomVideos(testFilePath)).rejects.toThrow('Failed to build newsroom videos: Invalid data structure received from YouTube API');
    });

    it('should handle HTTP status code', async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 404,
            json: jest.fn().mockResolvedValue({}),
        });

        await expect(buildNewsroomVideos(testFilePath)).rejects.toThrow('Failed to build newsroom videos: HTTP error! with status code: 404');
    });

    it('should throw an error with incorrect parameters', async () => {
        await expect(buildNewsroomVideos('randomePath')).rejects.toThrow("Failed to build newsroom videos");
    });
});
