const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { resolve, dirname } = require('path');
const fetch = require('node-fetch-2');

async function buildNewsroomVideos(writePath) {
    try {
        const dir = dirname(writePath);
        
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        const response = await fetch('https://youtube.googleapis.com/youtube/v3/search?' + new URLSearchParams({
            key: process.env.YOUTUBE_TOKEN,
            part: 'snippet',
            channelId: 'UCIz9zGwDLbrYQcDKVXdOstQ',
            eventType: 'completed',
            type: 'video',
            order: 'Date',
            maxResults: 5,
        }));

        if (!response.ok) {
            throw new Error(`HTTP error! with status code: ${response.status}`);
        }

        const data = await response.json();

        if (!data.items || !Array.isArray(data.items)) {
            throw new Error('Invalid data structure received from YouTube API');
        }

        const videoDataItems = data.items.map((video) => ({
            image_url: video.snippet.thumbnails.high.url,
            title: video.snippet.title,
            description: video.snippet.description,
            videoId: video.id.videoId,
        }));

        const videoData = JSON.stringify(videoDataItems, null, '  ');
        console.log('The following are the Newsroom Youtube videos: ', videoData);

        await retryWriteFile(writePath, videoData);

        return videoData;
    } catch (err) {
        throw new Error(`Failed to build newsroom videos: ${err.message}`);
    }
}

async function retryWriteFile(filePath, data, retries = 3, delay = 1000) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            writeFileSync(filePath, data);
            console.log(`File written successfully to ${filePath}`);
            break;
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error(`ENOENT error on attempt ${attempt + 1}. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                throw err;
            }
        }
    }
}

/* istanbul ignore next */
if (require.main === module) {
    buildNewsroomVideos(resolve(__dirname, '../config', 'newsroom_videos.json'));
}

module.exports = { buildNewsroomVideos };
