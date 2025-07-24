import React, { useEffect, useState } from 'react';

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
          className='rounded-full bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#8851FB]'
          onClick={scrollUp}
        >
          <img src={scrollImage} alt='scroll to top' />
        </button>
      )}
    </div>
  );
}

export default ScrollButton;
