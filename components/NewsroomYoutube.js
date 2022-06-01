import { useEffect } from 'react';

export default function NewsroomYoutube() {
  useEffect(() => {
    async function youtube (){
      const response = await fetch('https://youtube.googleapis.com/youtube/v3/search?'+ new URLSearchParams({
           key: process.env.YOUTUBE_TOKEN,
           part: 'snippet',
           channelID: 'UCIz9zGwDLbrYQcDKVXdOstQ',
         }))
      const data = await response.json(); 
      console.log(data.items);
      }
    youtube()
  }, [])
  
  return (
    <div>
      
    </div>
  )
}
