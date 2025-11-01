import React, { useEffect, useState } from 'react';
import IconArrowUp from '../icons/Scroll-up-arrow';

/**
 * @returns {React.JSX.Element} The ScrollButton component
 * @description The ScrollButton component is a button that scrolls the user to the top of the page.
 */
function ScrollButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);
  const scrollImage = '/img/loaders/scroll.svg';

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='fixed bottom-14 right-4 z-40 h-16 w-12'>
      {backToTopButton && (
        <button
          className='rounded-full bg-white shadow-xl transition-all duration-200 ease-linear hover:scale-110 hover:bg-[#8851FB]'
          onClick={scrollUp}
        >
         <IconArrowUp className="w-12 h-12 px-2 py-2 text-gray-900 hover:text-white" />
        </button>
      )}
    </div>
  );
}

export default ScrollButton;
