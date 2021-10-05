import React from "react";

const Banner = () => {
  return (
    <div className="bg-primary-600 ">
      <div className="mx-auto max-w-screen-xl py-1 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center text-xs">
            <span className="flex px-2 py-1 rounded-lg bg-primary-100 text-primary-600 text-xs uppercase font-bold">
              Hackathon
            </span>
            <p className="ml-3 font-medium  text-white truncate">
              <span className="md:hidden">Our Global Hackathon is on! <a className="underline" href="/blog/hackathon-faq" target="_blank" rel="noreferrer">Join us &rarr;</a></span>
              <span className="hidden md:inline">
                Our Global Hackathon has begun! Prizes to be won ⭐️
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto hidden md:block">
            <a
              href="/blog/hackathon-faq"
              className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
