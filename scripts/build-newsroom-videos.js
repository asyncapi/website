const { writeFileSync } = require('fs');
const { resolve } = require('path');
const fetch = require('node-fetch-2')
async function buildNewsroomVideos() {

    try {
        let data;
        const response = await fetch('https://youtube.googleapis.com/youtube/v3/search?' + new URLSearchParams({
            key: process.env.YOUTUBE_TOKEN,
            part: 'snippet',
            channelId: 'UCIz9zGwDLbrYQcDKVXdOstQ',
            eventType: 'completed',
            type: 'video',
            order: 'Date',
            maxResults: 5,
        }))
        data = await response.json()
        const videoDataItems = data.items.map((video) => {
            return {
                image_url: video.snippet.thumbnails.high.url,
                title: video.snippet.title,
                description: video.snippet.description,
                videoId: video.id.videoId,
            }
        })
        const videoData = JSON.stringify(videoDataItems, null, '  ');
        console.log('The following are the Newsroom Youtube videos: ', videoData)

        try {
            writeFileSync(
                resolve(__dirname, '../config', 'newsroom_videos.json'),
                videoData
            );
        } catch (err) {
            console.error(err);
        }
        return videoData;
    } catch (err) {
        console.log(err)
    }
}

buildNewsroomVideos()
module.exports={buildNewsroomVideos}