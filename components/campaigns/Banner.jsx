import React from "react";

const Banner = () => {
  return (
    <div className="bg-primary-600">
      <div className="mx-auto max-w-screen-xl py-1 px-3 sm:px-6 lg:px-8">

        {/* mobile view */}
        <div className="flex md:hidden items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center text-xs">
            <p className="font-medium text-white truncate">
              <span className="md:inline">
                AsyncAPI Conference 2021 has ended! ⭐️
              </span>
            </p>
          </div>
          <div className="order-3 flex-shrink-0 sm:order-2 smmd:block">
            <a
              href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijq9F5eYsJomWc7Zf6EYVTZ"
              className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-indigo-600 focus:text-indigo-600 bg-white hover:bg-indigo-50"
              target="_blank" rel="noopener noreferrer"
            >
              See recordings
            </a>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center text-xs">
            <p className="font-medium text-white truncate">
              <span className="md:inline">
                AsyncAPI Conference 2021 has ended. Good news: you can still watch the recording! ⭐️
              </span>
            </p>
          </div>
          <div className="order-3 flex-shrink-0 sm:order-2 smmd:block">
            <div className="flex">
              <a
                href="https://www.youtube.com/watch?v=VpxFpKU2r0U"
                className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-indigo-600 focus:text-indigo-600 bg-white hover:bg-indigo-50"
                target="_blank" rel="noopener noreferrer"
              >
                Day 1
              </a>
              <a
                href="https://www.youtube.com/watch?v=mWQtnQIqXTw"
                className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-indigo-600 focus:text-indigo-600 bg-white hover:bg-indigo-50 ml-1"
                target="_blank" rel="noopener noreferrer"
              >
                Day 2
              </a>
              <a
                href="https://www.youtube.com/watch?v=3EeMHhbwyOQ"
                className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-indigo-600 focus:text-indigo-600 bg-white hover:bg-indigo-50 ml-1"
                target="_blank" rel="noopener noreferrer"
              >
                Day 3
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
