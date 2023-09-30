import React from "react";

const recordings = {
  1: 'NTHsezlKBh8',
  // 4th November
  2: '8khuAfL7TSE',
  // 5th November
  3: 'R8PYWXDDZbI',
}

export default function Banner({}) {
  const day = new Date().getUTCDate();
  const month = new Date().getUTCMonth();
  const year = new Date().getUTCFullYear();

  // month=10 is November. Show only between 6-30 November.
  if (year > 2022 || month !== 10 || day < 6) {
    return null;
  }

  return (
    <div className="bg-gray-100" data-testid="Banner-main-div">
      <div className="mx-auto max-w-screen-xl py-1 px-3 sm:px-6 lg:px-8" >
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex md:hidden w-0 flex-1 flex items-center text-xs">
            <p className="font-medium text-gray-700">
              <span className="md:inline">
                AsyncAPI Conference 2022 has ended! ⭐️
              </span>
            </p>
          </div>
          <div className="hidden md:flex w-0 flex-1 flex items-center text-xs">
            <p className="font-medium text-gray-700">
              <span className="md:inline">
                AsyncAPI Conference 2022 has ended. Good news: you can still watch the recording! ⭐️
              </span>
            </p>
          </div>
          <div className="flex">
            <a data-testid="Banner-link"
              href="https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl"
              className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-indigo-600 focus:text-indigo-600 bg-white hover:bg-indigo-50"
              target="_blank" rel="noopener noreferrer"
            >
              See recordings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
