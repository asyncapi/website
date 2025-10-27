import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import type { youtube_v3 } from 'googleapis';
import fetch from 'node-fetch-2';
import process from 'process';

import { logger } from './helpers/logger';

dotenv.config();

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
export async function buildNewsroomVideos(writePath: string): Promise<string> {
  try {
    if (!process.env.YOUTUBE_TOKEN) {
      const error = new Error('YOUTUBE_TOKEN environment variable is required');

      (error as any).context = {
        operation: 'buildNewsroomVideos',
        stage: 'environment_check'
      };
      throw error;
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
      const error = new Error(`HTTP error! with status code: ${response.status}`);

      (error as any).context = {
        operation: 'buildNewsroomVideos',
        stage: 'api_request',
        statusCode: response.status,
        statusText: response.statusText
      };
      throw error;
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      const error = new Error('Invalid data structure received from YouTube API');

      (error as any).context = {
        operation: 'buildNewsroomVideos',
        stage: 'recieved_data_validation',
        receivedData: data,
        expectedStructure: 'data.items should be an array'
      };
      throw error;
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
    const error = new Error(`Failed to build newsroom videos: ${(err as Error).message}`);

    (error as any).context = {
      operation: (err as any)?.context?.operation || 'buildNewsroomVideos',
      stage: (err as any)?.context?.stage || 'main_execution',
      writePath,
      errorMessage: (err as Error).message,
      errorStack: (err as Error).stack?.split('\n').slice(0, 3).join('\n'),
      nestedContext: (err as any)?.context || null
    };
    throw error;
  }
}
