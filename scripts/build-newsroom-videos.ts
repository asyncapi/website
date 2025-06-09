import { writeFileSync } from 'fs';
import type { youtube_v3 } from 'googleapis';
import fetch from 'node-fetch-2';
import { dirname, resolve } from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

import { logger } from './helpers/logger';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

/**
 * Retrieves the latest videos from the AsyncAPI YouTube channel and writes them
 * as a formatted JSON string to the specified file.
 *
 * This function fetches video data from the YouTube API using the YOUTUBE_TOKEN environment variable.
 * It extracts key details—including the thumbnail URL, title, description, and video ID—from the API response,
 * writes the JSON-formatted data to the provided file path, and returns the JSON string.
 *
 * @param writePath - The file path where the video data will be saved.
 * @returns A promise that resolves to a JSON string containing the video data.
 *
 * @throws Error if the YOUTUBE_TOKEN environment variable is not set, if the API request fails, or
 * if the response has an unexpected structure.
 */
async function buildNewsroomVideos(writePath: string): Promise<string> {
  try {
    if (!process.env.YOUTUBE_TOKEN) {
      throw new Error('YOUTUBE_TOKEN environment variable is required');
    }
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?${new URLSearchParams({
        key: process.env.YOUTUBE_TOKEN,
        part: 'snippet',
        channelId: 'UCIz9zGwDLbrYQcDKVXdOstQ',
        eventType: 'completed',
        type: 'video',
        order: 'Date',
        maxResults: '5'
      })}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! with status code: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid data structure received from YouTube API');
    }

    const videoDataItems = data.items.map((video: youtube_v3.Schema$SearchResult) => {
      return {
        image_url: video.snippet?.thumbnails?.high?.url,
        title: video.snippet?.title,
        description: video.snippet?.description,
        videoId: video.id?.videoId
      };
    });

    const videoData = JSON.stringify(videoDataItems, null, '  ');

    logger.info(`The following are the Newsroom Youtube videos: ${videoData}`);

    writeFileSync(writePath, videoData);

    return videoData;
  } catch (err) {
    throw new Error(`Failed to build newsroom videos: ${(err as Error).message}`);
  }
}

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildNewsroomVideos(resolve(currentDirPath, '../config', 'newsroom_videos.json'));
}

export { buildNewsroomVideos };
