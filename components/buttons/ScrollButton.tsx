import React, { useEffect, useState } from 'react';

/**
 * @returns {React.JSX.Element} The ScrollButton component
 * @description The ScrollButton component is a button that scrolls the user to the top of the page.
 */
function ScrollButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);
  const scrollImage = '/img/loaders/scroll.svg';

  useEffect(() => {
    const handleScroll = () => {
      setBackToTopButton(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
          className='rounded-full bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary-500 dark:bg-dark-card dark:hover:bg-primary-500'
          onClick={scrollUp}
          aria-label='Scroll to top'
        >
          <img src={scrollImage} alt='scroll to top' className='dark:invert' />
        </button>
      )}
    </div>
  );
}

export default ScrollButton;
