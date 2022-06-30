import { useState, useRef } from 'react';
import TextTruncate from 'react-text-truncate'
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import TextLink from '../typography/TextLink';
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'
import videoData from '../../config/newsroom_videos.json';

export default function NewsroomYoutube({ className = ''}) {
  const [current, setCurrent] = useState(0)
  const videoContainer = useRef();
  const videoref = useRef();

  const shiftLeft = (e) => {
    e.preventDefault();
    if (current > 0) { 
      setCurrent(current - 1);
      const width = videoref.current.clientWidth;
      videoContainer.current.scrollLeft -= width + 18;
    }
  };

  const shiftRight = (e) => {
    e.preventDefault();
    if (current < 3) {
      setCurrent(current+ 1);
      const width = videoref.current.clientWidth;
      videoContainer.current.scrollLeft += width + 18;
    }  
  };

  let buttonClass = 'shadow-md rounded border mx-2 mb-2 focus:outline-none';

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
            className="rounded-lg w-1/2 min-w-full xl:min-w-76 mb-2 border border-gray-200 overflow-hidden shadow-md flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            <img
              src={video.image_url}
              alt="video"
              className="h-60 w-full object-cover"
            />

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="">
              <Heading level="h3" typeStyle="heading-sm-semibold" className="mt-2">
                {video.title}
              </Heading>
              <Paragraph typeStyle="body-md" className="mt-3 break-words">
                  <TextTruncate element="span" line={1} text={video.description} />
              </Paragraph>
              </div>
              <div className='mt-6 block'>
              <TextLink
                href={`https://youtube.com/watch?v=${video.videoId}`}
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
      <div className="flex flex-row mt-5 justify-content-center md:justify-content-start my-7">
        <button className={`${buttonClass} py-3 px-6 ml-0 ${ current === 0 ? 'cursor-not-allowed bg-white border-gray-200 text-gray-200' : 'bg-secondary-100  hover:bg-secondary-500 border-secondary-500  text-secondary-500 hover:text-white transition-all duration-300 ease-in-out'}`} onClick={shiftLeft}>
          <ArrowLeft className="w-4" />
        </button>
        <button className={`${buttonClass} py-1 px-4 ${ current === 3 ? 'cursor-not-allowed bg-white border-gray-200 text-gray-200' : 'bg-secondary-100  hover:bg-secondary-500 border-secondary-500  text-secondary-500 hover:text-white transition-all duration-300 ease-in-out'}`} onClick={shiftRight}>
          <ArrowRight className="w-8" />
        </button>
      </div>
    </div>
  );
}