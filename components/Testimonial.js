import ArrowLeft from '../components/icons/ArrowLeft'
import ArrowRight from '../components/icons/ArrowRight'
import { useState, useEffect } from 'react';
import testimonials from './TestimonialData';

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const len = testimonials.length;

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? len - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === len - 1 ? 0 : prevIndex + 1));
  };

  const goToIndex = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000); 
    return () => {
      clearInterval(interval); 
    };
  }, []);

  return (
    <div className="relative flex flex-row justify-center items-center md:gap-4 overflow-x-hidden">
      <div className="h-8 w-8 rounded-full bg-[#ddd] cursor-pointer mb-2 absolute left-0 z-10 top-1/2 transform -translate-y-1/2 opacity-50 md:opacity-100 flex justify-center items-center" onClick={goToPrevious}>
       <ArrowLeft className='w-4'/>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative h-[300px] w-[300px] md:w-[600px] md:h-[450px] overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center absolute bg-slate-100 shadow-md rounded-md transform transition-transform ${
                index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <div className="rounded-full h-16 w-16 md:h-32 md:w-32 overflow-hidden my-4">
                <img src={testimonial.imgUrl} className="h-full w-full" alt={testimonial.name} />
              </div>
              <p className="text-[14px] lg:text-base lg:leading-6 font-bold text-gray-900 mb-2">
                {testimonial.name}
              </p>
              <p className="text-[12px] lg:text-base lg:leading-6 font-medium text-primary-500 mb-2 md:mb-4">
                {testimonial.salutation}
              </p>
              <p className="h-[200px] text-base px-2 lg:px-6 overflow-clip md:text-lg">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      <div className="flex justify-center w-[400px] mt-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${
              activeIndex === index ? 'bg-primary-500' : 'bg-gray-300'
            }`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
      </div>
      <div
            className="h-8 w-8 rounded-full bg-[#ddd] cursor-pointer mb-2 z-10 absolute right-0 top-1/2 transform -translate-y-1/2 opacity-50 md:opacity-100"
            onClick={goToNext}
          >
            <ArrowRight />
          </div>
    </div>
  );
};

export default TestimonialCarousel;
