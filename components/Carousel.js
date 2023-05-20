import React, { Fragment, useEffect, useState } from "react";


export default function Carousel({
  data,
  fullscreen,
  timer,
  interval,
  arrows,
  dots,
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function handlePrevious() {
    let i = current;
    i -= 1;
    if (i < 0) i = data.length - 1;
    setCurrent(i);
  }

  function handleNext() {
    let i = current;
    i += 1;
    if (i > data.length - 1) i = 0;
    setCurrent(i);
  }

  function handlePause() {
    setPaused(!paused);
  }

  useEffect(() => {
    const INTERVAL = setInterval(() => {
      if (timer && !paused) handleNext();
    }, interval || 5000);

    return () => clearInterval(INTERVAL);
  }, [current, paused]);

  {/*---------------------------------------------------- Component start here ------------------------------------------------------ */}

  return (
    <div
      className={`flex mx-auto mb-5 overflow-hidden justify-center ${
        isFullscreen
          ? "fixed top-0 left-0 z-50 h-screen bg-white dark:bg-slate-700"
          : "w-[80vw] relative"
      }`}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className={`${
            index === current ? "relative" : "absolute opacity-0"
          } ${index !== current && index > current ? "translate-x-full" : ""} ${
            index !== current && index < current ? "-translate-x-full" : ""
          } w-full transition-all duration-700`}
        >
          {!item.video ? item.element : null}
          {index === current && item.video ? item.element : null}
          <div
            className={`${
              index === current ? "" : "opacity-0"
            } absolute bottom-0 w-full`}
          >
            {item.show ? (
              <div className="mx-auto mb-10 w-3/4 flex-col text-center">
                <p className="text-slate-300 text-2xl">{data.title}</p>
                <p className="text-slate-300 text-2xl">{data.description}</p>
              </div>
            ) : null}
          </div>
        </div>
      ))}
      <div className="absolute inset-x-5 flex justify-between pt-5">
        {timer ? (
          <button
            key={"Carousel-pause"}
            onClick={() => handlePause()}
            className="opacity-75 hover:opacity-100 hover:scale-110 transition-all"
          >
            {paused ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"></path>
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"></path>
              </svg>
            )}
          </button>
        ) : (
          <div></div>
        )}
        {fullscreen ? (
          <button
            key={"Carousel-screen"}
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="opacity-75 hover:opacity-100 hover:scale-110 transition-all"
          >
            {isFullscreen ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                viewBox="0 0 16 16"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 7h6.5l-2.5-2.5 3-3-1.5-1.5-3 3-2.5-2.5z"></path>
                <path d="M9 9v6.5l2.5-2.5 3 3 1.5-1.5-3-3 2.5-2.5z"></path>
                <path d="M7 9h-6.5l2.5 2.5-3 3 1.5 1.5 3-3 2.5 2.5z"></path>
                <path d="M7 7v-6.5l-2.5 2.5-3-3-1.5 1.5 3 3-2.5 2.5z"></path>
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m21 15.344-2.121 2.121-3.172-3.172-1.414 1.414 3.172 3.172L15.344 21H21zM3 8.656l2.121-2.121 3.172 3.172 1.414-1.414-3.172-3.172L8.656 3H3zM21 3h-5.656l2.121 2.121-3.172 3.172 1.414 1.414 3.172-3.172L21 8.656zM3 21h5.656l-2.121-2.121 3.172-3.172-1.414-1.414-3.172 3.172L3 15.344z"></path>
              </svg>
            )}
          </button>
        ) : (
          <div />
        )}
      </div>

      <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
        {arrows ? (
          <Fragment>
            <button
              key={"Carousel-left"}
              onClick={() => handlePrevious()}
              className="opacity-75 hover:opacity-100 hover:scale-110 transition-all"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                <path d="M16 16V8l-5 4zM9 8v8h2V8z"></path>
              </svg>
            </button>
            <button
              key={"Carousel-right"}
              onClick={() => handleNext()}
              className="opacity-75 hover:opacity-100 hover:scale-110 transition-all"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                <path d="m8 16 5-4-5-4zm5-4v4h2V8h-2z"></path>
              </svg>
            </button>
          </Fragment>
        ) : null}
      </div>
      <div className="absolute inset-x-5 bottom-0 pb-5 flex justify-center">
        {dots ? (
          <div className="flex gap-2">
            {data.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full hover:scale-150 transition-all ${
                  current === index ? " bg-purple-300" : "bg-slate-500"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}