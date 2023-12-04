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
  // month=11 is December. Show only between 6-30 November.
  if (year > 2023 && month > 11 && day < 6) {
    return null;
  }

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl py-1 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="hidden md:flex w-0 flex-1 flex items-center text-xs">
            <p className="font-medium text-gray-700">
              <span className="md:inline">
                AsyncAPI v3 has landed! ⭐️
              </span>
            </p>
          </div>
          <div className="flex">
            <a
              href="/blog/release-notes-3.0.0"
              className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-indigo-600 focus:text-indigo-600 bg-white hover:bg-indigo-50"
              target="_blank" rel="noopener noreferrer"
            >
              Release notes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
