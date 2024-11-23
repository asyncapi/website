import assert from 'assert';
import { writeFileSync } from 'fs';
import type { youtube_v3 } from 'googleapis';
import { google } from 'googleapis';
import { dirname, resolve } from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_TOKEN
});

async function buildNewsroomVideos(writePath: string) {
  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      channelId: 'UCIz9zGwDLbrYQcDKVXdOstQ',
      eventType: 'completed',
      type: ['video'],
      order: 'date',
      maxResults: 5
    } as youtube_v3.Params$Resource$Search$List);

    if (response.status !== 200) {
      throw new Error(`HTTP error! with status code: ${response.status}`);
    }

    const data = await response.data;

    console.log(data);

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid data structure received from YouTube API');
    }

    const videoDataItems = data.items.map((video) => {
      if (!video.snippet) {
        throw new Error('Invalid data structure received from YouTube API');
      }

      return {
        image_url: video.snippet.thumbnails!.high!.url,
        title: video.snippet.title,
        description: video.snippet.description,
        videoId: video.id!.videoId
      };
    });

    const videoData = JSON.stringify(videoDataItems, null, '  ');

    console.log('The following are the Newsroom Youtube videos: ', videoData);

    writeFileSync(writePath, videoData);

    return videoData;
  } catch (err) {
    assert(err instanceof Error);
    throw new Error(`Failed to build newsroom videos: ${err.message}`);
  }
}

/* istanbul ignore next */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildNewsroomVideos(resolve(currentDirPath, '../config', 'newsroom_videos.json'));
}

export { buildNewsroomVideos };
