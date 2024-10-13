import React, { useState } from 'react';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import videoData from '../../config/newsroom_videos.json';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import { checkLastSnapIndex, useSwiperRef } from './swiper';
import YouTubeCard from './YouTubeCard';

interface NewsroomYoutubeProps {
  className?: string;
}

/**
 * Newsroom Youtube component displays a Swiper carousel of YouTubeCard components.
 * @description This component displays the latest videos from the AsyncAPI YouTube channel.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function NewsroomYoutube({ className = '' }: NewsroomYoutubeProps) {
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();
  const [current, setCurrent] = useState<number>(0);

  const buttonClass = 'shadow-md rounded border mx-2 mb-2 focus:outline-none';

  return (
    <div className={`flex-col overflow-auto ${className}`} data-testid='NewsroomYoutube-main'>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={8}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrent(swiper.snapIndex)}
        navigation={{
          prevEl,
          nextEl
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

      <div className='justify-content-center md:justify-content-start ml-2 flex flex-row'>
        <button
          ref={prevElRef}
          className={`${buttonClass} ml-0 px-6 py-3 ${current === 0 ? 'cursor-not-allowed border-gray-200 bg-white text-gray-200' : 'border-secondary-500  bg-secondary-100 text-secondary-500  hover:bg-secondary-500 hover:text-white'}`}
          data-testid='Youtube-Prev-button'
        >
          <ArrowLeft className='w-4' />
        </button>
        <button
          ref={nextElRef}
          className={`${buttonClass} px-4 py-1 ${checkLastSnapIndex(current) ? 'cursor-not-allowed border-gray-200 bg-white text-gray-200' : 'border-secondary-500  bg-secondary-100 text-secondary-500  hover:bg-secondary-500 hover:text-white'}`}
          data-testid='Youtube-Next-button'
        >
          <ArrowRight className='w-8' />
        </button>
      </div>
    </div>
  );
}
