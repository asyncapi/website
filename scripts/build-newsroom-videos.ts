import { writeFileSync } from 'fs';
import type { youtube_v3 } from 'googleapis';
import fetch from 'node-fetch-2';
import { dirname, resolve } from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

async function buildNewsroomVideos(writePath: string) {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?${new URLSearchParams({
        key: process.env.YOUTUBE_TOKEN!,
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

    const videoDataItems = data.items.map((video: youtube_v3.Schema$SearchResult) => ({
      image_url: video.snippet?.thumbnails?.high?.url,
      title: video.snippet?.title,
      description: video.snippet?.description,
      videoId: video.id?.videoId
    }));

    const videoData = JSON.stringify(videoDataItems, null, '  ');

    console.log('The following are the Newsroom Youtube videos: ', videoData);

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
