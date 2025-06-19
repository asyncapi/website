import { writeFileSync } from 'fs';
import type { youtube_v3 } from 'googleapis';
import fetch from 'node-fetch-2';
import process from 'process';
import { logger } from './utils/logger';

// To load the environment variables from the .env file
import dotenv from 'dotenv';
dotenv.config();


/**
 * Fetches the latest YouTube videos from the AsyncAPI channel and writes the data to a specified path.
 *
 * @param {string} writePath - The path to write the video data.
 * @returns {Promise<string>} - A promise that resolves to the video data in JSON format.
 * @throws {Error} - Throws an error if there is an issue during the fetch or write process.
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
    throw err;
  }
}

export { buildNewsroomVideos };
