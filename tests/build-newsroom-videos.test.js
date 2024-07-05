const { buildNewsroomVideos } = require('../scripts/build-newsroom-videos');
const { writeFileSync } = require('fs');
const fetch = require('node-fetch');
const { resolve } = require('path');

const { mockApiResponse,expectedResult } = require('./fixtures/newsroomData')

const resolvedPath = resolve(__dirname, '../config', 'newsroom_videos.json');

jest.mock('node-fetch', () => jest.fn());
jest.mock('fs', () => ({
    writeFileSync: jest.fn(),
}));

describe('buildNewsroomVideos', () => {
    beforeEach(() => {
        fetch.mockClear();
        writeFileSync.mockClear();
        process.env.YOUTUBE_TOKEN = 'testkey';
    });

    it('should fetch video data and write to file', async () => {

        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockApiResponse),
        });

        const result = await buildNewsroomVideos();

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('https://youtube.googleapis.com/youtube/v3/search?'));
        expect(writeFileSync).toHaveBeenCalledWith(resolvedPath,expectedResult);

        expect(result).toEqual(expectedResult);
    });

    it('should handle fetch errors', async () => {
        fetch.mockRejectedValue(new Error('Fetch error'));

        await expect(buildNewsroomVideos()).rejects.toThrow('Failed to build newsroom videos: Fetch error');
    });

    it('should handle file write errors', async () => {

        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockApiResponse),
        });

        writeFileSync.mockImplementation(() => {
            throw new Error('Write error');
        });

        await expect(buildNewsroomVideos()).rejects.toThrow('Failed to build newsroom videos: Write error');
    });

    it('should handle invalid API response', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        });

        await expect(buildNewsroomVideos()).rejects.toThrow('Failed to build newsroom videos: Invalid data structure received from YouTube API');
    });
});