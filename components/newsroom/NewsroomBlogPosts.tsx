import React, { useState } from 'react';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getAllPosts } from '../../utils/api';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import BlogPostItem from '../navigation/BlogPostItem';
import { checkLastSnapIndex, useSwiperRef } from './swiper';

/**
 * @description This component displays the latest blog posts.
 */
export default function NewsroomBlogPosts() {
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();
  const [current, setCurrent] = useState<number>(0);

  const posts = getAllPosts()
    .blog.sort((i1, i2) => {
      const i1Date = new Date(i1.date);
      const i2Date = new Date(i2.date);

      if (i1.featured && !i2.featured) return -1;
      if (!i1.featured && i2.featured) return 1;

      return i2Date.valueOf() - i1Date.valueOf();
    })
    .slice(0, 5);

  const buttonClass = 'shadow-md rounded border mx-2 mb-2 focus:outline-none';

  return (
    <div className='flex-col overflow-auto' data-testid='NewsroomBlog-main-div'>
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
        {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <BlogPostItem post={post} className='min-w-full h-full px-2 pb-6' />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='justify-content-center md:justify-content-start ml-2 flex flex-row'>
        <button
          ref={prevElRef}
          className={`${buttonClass} ml-0 px-6 py-3 ${current === 0 ? 'cursor-not-allowed border-gray-200 bg-white text-gray-200' : 'border-secondary-500  bg-secondary-100 text-secondary-500  hover:bg-secondary-500 hover:text-white'}`}
          data-testid='Blog-Prev-button'
        >
          <ArrowLeft className='w-4' />
        </button>
        <button
          ref={nextElRef}
          className={`${buttonClass} px-4 py-1 ${checkLastSnapIndex(current) ? 'cursor-not-allowed border-gray-200 bg-white text-gray-200' : 'border-secondary-500  bg-secondary-100 text-secondary-500  hover:bg-secondary-500 hover:text-white'}`}
          data-testid='Blog-Next-button'
        >
          <ArrowRight className='w-8' />
        </button>
      </div>
    </div>
  );
}
