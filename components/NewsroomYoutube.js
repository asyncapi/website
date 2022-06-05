import { useEffect, useState, useRef } from 'react';
import TextTruncate from 'react-text-truncate'
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import TextLink from './typography/TextLink';
import tempData from '../config/videos.json';
import Heading from './typography/Heading'
import Paragraph from './typography/Paragraph'

export default function NewsroomYoutube({ className = '' }) {
  const [videoData, setvideoData] = useState([]);
  const videoContainer = useRef();
  const videoref = useRef();
  const shiftLeft = (e) => {
    e.preventDefault();
    const width = videoref.current.clientWidth;
    videoContainer.current.scrollLeft -= width + 16;
  };
  const shiftRight = (e) => {
    e.preventDefault();
    const width = videoref.current.clientWidth;
    videoContainer.current.scrollLeft += width + 16;
  };

  let buttonClass = 'bg-secondary-100 hover:bg-secondary-500 shadow-md rounded border-secondary-500 border text-secondary-500 hover:text-white focus:outline-none mx-2';
  useEffect(() => {
    // async function youtube() {
    //   const response = await fetch('https://youtube.googleapis.com/youtube/v3/search?' + new URLSearchParams({
    //     key: process.env.YOUTUBE_TOKEN,
    //     part: 'snippet',
    //     channelId: 'UCIz9zGwDLbrYQcDKVXdOstQ',
    //     eventType: 'completed',
    //     type:'video',
    //     order: 'Date',
    //     maxResults: 5,
    //   }))
    //   const data = await response.json();
    //   console.log(data.items);
    //   setvideoData(data.items);
    // }
    // youtube()
    setvideoData(tempData);
  }, []);

  return (
    <div className={`${className}`}>
      <div
        className={`flex overflow-x-auto scroll-none list-none gap-4`}
        ref={videoContainer}
      >
        {videoData.map((video, index) => (
          <div
            key={index}
            ref={videoref}
            className="rounded w-1/2 min-w-full md:min-w-76 border border-gray-200 overflow-hidden drop-shadow-md flex flex-col"
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt=""
              className="h-48 w-full object-cover"
            />

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="">
              <Heading level="h3" typeStyle="heading-sm-semibold" className="mt-2">
                {video.snippet.title}
              </Heading>
              <Paragraph typeStyle="body-md" className="mt-3 break-words">
                  <TextTruncate element="span" line={3} text={video.snippet.description} />
              </Paragraph>
              </div>
              <div className='mt-6 block'>
              <TextLink
                href={`https://youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                className=""
              >
                Watch on Youtube
                <ArrowRight className="inline w-6" />
              </TextLink>
            </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row mt-4 justify-content-center md:justify-content-start my-7">
        <button className={`${buttonClass} py-3 px-6 ml-0`} onClick={shiftLeft}>
          <ArrowLeft className="w-4" />
        </button>
        <button className={`${buttonClass} py-1 px-4`} onClick={shiftRight}>
          <ArrowRight className="w-8" />
        </button>
      </div>
    </div>
  );
}
