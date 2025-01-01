import React, { useState } from 'react';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import { checkLastSnapIndex, useSwiperRef } from '../newsroom/swiper';
import Testimonial from './Testimonial';

/**
 * @description A carousel component that displays customer testimonials with navigation controls
 * @returns {JSX.Element} A responsive slider showing testimonials from industry leaders
 */
export default function TestimonialsCarousel() {
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();
  const [current, setCurrent] = useState<number>(0);

  const testimonials = [
    {
      text: 'Microservices underline the need for event-based communication in distributed architectures. AsyncAPI brings the richness of the REST API ecosystem to asynchronous APIs.',
      authorAvatar: '/img/testimonials/matt-mclarty.jpg',
      authorName: 'Matt McLarty',
      authorDescription: 'Global Leader of API Strategy at MuleSoft'
    },
    {
      text: 'Event-driven APIs need love too! AsyncAPI brings the many benefits of a machine/human-readable specification to these nuanced approaches.',
      authorAvatar: '/img/testimonials/bill-doerrfeld.jpg',
      authorName: 'Bill Doerrfeld',
      authorDescription: 'Editor in Chief at Nordic APIs'
    },
    {
      text: "Developers need to be able to quickly and consistently create event-driven applications that provide business value and react to customer needs in realtime. I can't count how many times I've heard developers ask for OpenAPI/Swagger style tools for the asynchronous and event-driven world, and that is exactly what the AsyncAPI initiative is making a reality.",
      authorAvatar: '/img/testimonials/jonathan-schabowsky.jpg',
      authorName: 'Jonathan Schabowsky',
      authorDescription: 'Sr. Architect, Office of the CTO at Solace'
    },
    {
      text: "We've been focusing on event-driven APIs since 2014 and thank the AsyncAPI contributors every day for driving the community towards common standards.",
      authorAvatar: '/img/testimonials/eric-horesnyi.jpg',
      authorName: 'Eric Horesnyi',
      authorDescription: 'CEO at Streamdata.io'
    }
  ];

  return (
    <div className='mx-auto max-w-7xl px-4 md:px-6 lg:px-8'>
      <div className='group relative'>
        <button
          ref={prevElRef}
          className={`absolute left-0 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border transition-colors duration-200 ${
            current === 0
              ? 'cursor-not-allowed border-gray-200 text-gray-300'
              : 'border-[#7B3FE4] text-[#7B3FE4] hover:bg-[#7B3FE4] hover:text-white'
          }`}
          data-testid='TestimonialsCarousel-Prev-button'
          aria-label='Previous slide'
        >
          <ArrowLeft className='size-5' />
        </button>

        <button
          ref={nextElRef}
          className={`absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-lg border transition-colors duration-200 ${
            checkLastSnapIndex(current)
              ? 'cursor-not-allowed border-gray-200 text-gray-300'
              : 'border-[#7B3FE4] text-[#7B3FE4] hover:bg-[#7B3FE4] hover:text-white'
          }`}
          data-testid='TestimonialsCarousel-Next-button'
          aria-label='Next slide'
        >
          <ArrowRight className='size-5' />
        </button>

        <div className='px-12'>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={32}
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
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Testimonial
                  className='md:pr-10 lg:pr-16'
                  text={testimonial.text}
                  authorAvatar={testimonial.authorAvatar}
                  authorName={testimonial.authorName}
                  authorDescription={testimonial.authorDescription}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
