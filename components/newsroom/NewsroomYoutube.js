import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';

import YouTubeCard from './YouTubeCard';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import videoData from '../../config/newsroom_videos.json';

import { useSwiperRef, checkLastSnapIndex } from './swiper';

export default function NewsroomYoutube({ className = '' }) {
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();
  const [current, setCurrent] = useState(0);

  const buttonClass = 'shadow-md rounded border mx-2 mb-2 focus:outline-none';

  return (
    <div className="flex-col overflow-auto">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={7}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrent(swiper.snapIndex)}
        navigation={{
          prevEl,
          nextEl,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2
          }
        }}
      >
        {videoData.map((video, index) => (
          <SwiperSlide key={index}>
            <YouTubeCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-row ml-2 justify-content-center md:justify-content-start">
        <button ref={prevElRef} className={`${buttonClass} py-3 px-6 ml-0 ${current === 0 ? 'cursor-not-allowed bg-white border-gray-200 text-gray-200' : 'bg-secondary-100  hover:bg-secondary-500 border-secondary-500  text-secondary-500 hover:text-white'}`}>
          <ArrowLeft className='w-4' />
        </button>
        <button ref={nextElRef} className={`${buttonClass} py-1 px-4 ${checkLastSnapIndex(current) ? 'cursor-not-allowed bg-white border-gray-200 text-gray-200' : 'bg-secondary-100  hover:bg-secondary-500 border-secondary-500  text-secondary-500 hover:text-white'}`}>
          <ArrowRight className='w-8' />
        </button>
      </div>
    </div>
  );
}