import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import TestimonialData from '../config/content/Testimonial';
import React, { useState } from 'react';

const Testimonial = () => {
  const len = TestimonialData.length;
  const [activeIndex, setActive] = useState(0);

    //The "distanceLeft"  variable represents the distance of a testimonial from the active index when moving to the left (previous   
    //testimonials).
    // Similarly distanceRight is also checked. 
  const getStyle = (idx) => {
    const distanceLeft = idx - activeIndex;
    const distanceRight =
      distanceLeft > 0 ? distanceLeft - len : distanceLeft + len;
    const distance =
      Math.abs(distanceLeft) > Math.abs(distanceRight)
        ? distanceRight
        : distanceLeft;

    const styleObj = {};
    // If the distance is 0 (testimonial is the active one): Set left to '30%' to position the testimonial in the center.Set zIndex to 1      
    //to ensure the active testimonial is displayed above others.Set opacity to 1 to make it fully visible.
    // Set transform to 'scale(1)' to maintain the original scale.
    if (distance === 0) {
      styleObj.left = '30%';
      styleObj.zIndex = 1;
      styleObj.opacity = 1;
      styleObj.transform = 'scale(1)';
    } else
    // If the distance is not 0 (testimonial is not the active one):
    // Set left dynamically based on the distance to create a sliding effect. Testimonials to the right will have increasing left values,     
    // while testimonials to the left will have decreasing left values.
    // Set filter to 'blur(2px)' to apply a blur effect to non-active testimonials.
    {
      styleObj.left =
        distance > 0 ? `${12 + distance * 35}%` : `${48 + distance * 35}%`;
      styleObj.filter = 'blur(2px)';  
    }
    // If the absolute value of the distance is greater than or equal to 2:
    // Set opacity to 0 to make the testimonial fully transparent.
    // Set transform to 'scale(0)' to scale the testimonial down to 0, making it invisible.
    if (Math.abs(distance) >= 2) {
      styleObj.opacity = 0;
      styleObj.transform = 'scale(0)';
    }

    return styleObj;
  };

  const goToPrevious = () => {
    setActive((prevIndex) => (prevIndex === 0 ? len - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setActive((prevIndex) => (prevIndex === len - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex flex-row justify-between items-center gap-3 h-full"> 
      <div className="h-8 w-8 rounded-full bg-[#ddd] cursor-pointer mb-2 z-60" onClick={goToPrevious}>
        <FaArrowLeft className="mt-[20%] m-auto"/>
      </div>
      <div className="flex flex-col">
      <div className="h-[460px] lg:h-[500px]">
         {TestimonialData.map(({ imgUrl, name, salutation, text }, index) => (
           <div
             className="h-[440px] lg:h-[480px] w-[40%] transition-all duration-500 absolute opacity-80 scale-90 cursor-pointer select-none flex flex-col items-center justify-center border border-gray-300 rounded-lg bg-white shadow-xl z-1}"
             key={index}
             onClick={() => setActive(index)}
             style={getStyle(index)}
          >
             <div className="rounded-full h-16 w-16 lg:h-32 lg:w-32 overflow-hidden mt-[-1rem] mb-2 lg:mb-4 lg:mt-[-2rem]">
               <img src={imgUrl} className="h-full w-full" alt={name} />
            </div>
            <p className="text-[14px] lg:text-base lg:leading-6 font-bold text-gray-900 mb-2">
              {name}
            </p>
            <p className="text-[12px] lg:text-base lg:leading-6 font-medium text-primary-500 mb-2 lg:mb-4">
              {salutation}
            </p>
            <p className="h-[200px] text-[12px] px-1 lg:px-6 overflow-clip lg:text-lg">
              {text}
            </p>
          </div>
         ))}
      
      </div>
      <div className="h-[20px] flex justify-center items-center">
    
        {TestimonialData.map((value, index) => (
          <div
            key={index}
            className={
              activeIndex === index
                ? 'h-[10px] w-[10px] bg-[#c62f2f] rounded-full mr-2 cursor-pointer '
                : 'h-[10px] w-[10px] rounded-full bg-[#ddd] mr-2 cursor-pointer'
            }
            onClick={() => setActive(index)}
          />
        ))}
      </div>
      </div>
          <div
            className="h-8 w-8 rounded-full bg-[#ddd] cursor-pointer mb-2 z-60"
            onClick={goToNext}
          >
            <FaArrowRight className="mt-[20%] m-auto"/>
          </div>
    </div>
  );
};

export default Testimonial;
