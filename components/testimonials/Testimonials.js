import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper';

import Container from '../layout/Container';
import Heading from '../typography/Heading';
import Testimonial from './Testimonial';
// import ArrowLeft from '../icons/ArrowLeft';
// import ArrowRight from '../icons/ArrowRight';
import testomonials from '../../config/testimonials.json';

// import { useSwiperRef, checkLastSnapIndex } from './swiper';

export default function Testimonials({ className = '' }) {
  // const [nextEl, nextElRef] = useSwiperRef();
  // const [prevEl, prevElRef] = useSwiperRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  // const buttonClass = 'shadow-md rounded border mx-2 mb-2 focus:outline-none';

  return (
    <div className='mb-20'>
      <Heading level="h3" typeStyle="heading-lg" className="mb-8 text-center">
        What the experts are saying
      </Heading>
      <div className="flex-col overflow-auto">
        <Swiper
          modules={[Autoplay, Navigation, A11y]}
          spaceBetween={12}
          slidesPerView={1}
          centeredSlides={true}
          onSlideChange={(swiper) => setCurrentSlide(swiper.snapIndex)}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 5,
            },
            2137: {
              slidesPerView: 6,
            },
            2642: {
              slidesPerView: 7,
            },
            3224: {
              slidesPerView: 8,
            }
          }}
          // navigation={{
          //   prevEl,
          //   nextEl,
          // }}
        >
          {testomonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Testimonial testimonial={testimonial} active={currentSlide === index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}