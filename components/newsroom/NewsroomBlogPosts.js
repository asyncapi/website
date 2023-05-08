import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import BlogPostItem from '../navigation/BlogPostItem'
import { getAllPosts } from '../../lib/api'

import { useSwiperRef, checkLastSnapIndex } from './swiper';

export default function NewsroomBlogPosts() {
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();
  const [current, setCurrent] = useState(0);

  const posts = getAllPosts()['blog']
    .sort((i1, i2) => {
      const i1Date = new Date(i1.date)
      const i2Date = new Date(i2.date)

      if (i1.featured && !i2.featured) return -1
      if (!i1.featured && i2.featured) return 1
      return i2Date - i1Date
    })
    .slice(0, 5);

  const buttonClass = 'shadow-md rounded border mx-2 mb-2 focus:outline-none';

  return (
    <div className="flex-col overflow-auto">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={8}
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
        {
          posts.map((post, index) => (
            <SwiperSlide key={index}>
              <BlogPostItem post={post} className="min-w-full h-full px-2 pb-6" />
            </SwiperSlide>
          ))
        }
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
  )
}
