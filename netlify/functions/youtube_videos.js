const fetch = require('node-fetch')
exports.handler = async function(){
     try{
      let data;
      const response = await fetch('https://youtube.googleapis.com/youtube/v3/search?' + new URLSearchParams({
        key: process.env.YOUTUBE_TOKEN,
        part: 'snippet',
        channelId: 'UCIz9zGwDLbrYQcDKVXdOstQ',
        eventType: 'completed',
        type:'video',
        order: 'Date',
        maxResults: 5,
      }))
      data = await response.json()
    
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    }catch(err){
      console.log(err)
    }
}