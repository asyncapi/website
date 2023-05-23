const testimonials = [
  {
    imgUrl: '/img/testimonials/matt-mclarty.jpg',
    name: 'Matt McLarty',
    salutation: 'Global Leader of API Strategy at MuleSoft',
    text: 'Microservices underline the need for event-based communication in distributed architectures. AsyncAPI brings the richness of the REST API ecosystem to asynchronous APIs.',
  },
  {
    imgUrl: '/img/testimonials/bill-doerrfeld.jpg',
    name: 'Bill Doerrfeld',
    salutation: 'Editor in Chief at Nordic APIs',
    text: 'Microservices underline the need for event-based communication in distributed architectures. AsyncAPI brings the richness of the REST API ecosystem to asynchronous APIs.',
  },
  {
    imgUrl: '/img/testimonials/jonathan-schabowsky.jpg',
    name: 'Jonathan Schabowsky',
    salutation: 'Sr. Architect, Office of the CTO at Solace',
    text: "Developers need to be able to quickly and consistently create event-driven applications that provide business value and react to customer needs in realtime. I can't count how many times I've heard developers ask for OpenAPI/Swagger style tools for the asynchronous and event driven world, and that is exactly what the AsyncAPI initiative is making a reality.",
  },
  {
    imgUrl: '/img/testimonials/eric-horesnyi.jpg',
    name: 'Eric Horesnyi',
    salutation: 'CEO at Streamdata.io',
    text: 'We’ve been focusing on event-driven APIs since 2014 and thank the AsyncAPI contributors everyday for driving the community towards common standards.',
  },
];
import React, { useState } from 'react';

const Testimonial = () => {
  const len = testimonials.length;
  const [activeIndex, setActive] = useState(0);

  const getStyle = (idx) => {
    const distanceLeft = idx - activeIndex;
    const distanceRight =
      distanceLeft > 0 ? distanceLeft - len : distanceLeft + len;
    const distance =
      Math.abs(distanceLeft) > Math.abs(distanceRight)
        ? distanceRight
        : distanceLeft;

    const styleObj = {};

    if (distance === 0) {
      styleObj.left = '33.3%';
      styleObj.zIndex = 1;
      styleObj.opacity = 1;
      styleObj.transform = 'scale(1)';
    } else {
      styleObj.left =
        distance > 0 ? `${14.7 + distance * 40}%` : `${52 + distance * 40}%`;
    }

    if (Math.abs(distance) >= 2) {
      styleObj.opacity = 0;
      styleObj.transform = 'scale(0)';
    }

    return styleObj;
  };

  return (
    <div>
      <div className="h-[460px] lg:h-[500px] overflow-hidden">
        {testimonials.map(({ imgUrl, name, salutation, text }, index) => (
          <div
            className="h-[440px] lg:h-[480px] w-[35%] transition-all duration-500 absolute opacity-80 scale-90 cursor-pointer select-none flex flex-col items-center justify-center border border-gray-300 rounded-lg  bg-zinc-50 shadow-xl z-1}"
            key={index}
            onClick={() => setActive(index)}
            style={getStyle(index)}
          >
            <div className="rounded-full border-gray-500 shadow-2xl h-16 w-16 lg:h-32 lg:w-32 overflow-hidden mt-[-1rem] mb-2 lg:mb-4 lg:mt-[-2rem] ">
              <img src={imgUrl} className="h-full w-full" alt={name} />
            </div>
            <p className="text-[14px] lg:text-base lg:leading-6 font-bold text-gray-900 mb-2">
              {name}
            </p>
            <p className="text-[12px] lg:text-base lg:leading-6 font-medium text-primary-500 mb-2 lg:mb-4">
              {salutation}
            </p>
            <p className="h-[200px] text-[12px]  px-1 lg:px-6  lg:text-lg overflow-scroll lg:overflow-hidden">
              {text}
            </p>
          </div>
        ))}
      </div>
      <div className="h-[20px] flex justify-center items-center">
        {testimonials.map((value, index) => (
          <div
            key={index}
            className={
              activeIndex === index
                ? 'h-[12px] w-[12px] bg-[#c62f2f] rounded-full mr-2 cursor-pointer '
                : 'h-[12px] w-[12px] rounded-full bg-[#ddd] mr-2 cursor-pointer'
            }
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
