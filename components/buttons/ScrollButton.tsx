import React, { useEffect, useState } from 'react';

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
        <button className='rounded-full bg-white shadow-md ' onClick={scrollUp}>
          {' '}
          <img src={scrollImage} />
        </button>
      )}
    </div>
  );
}

export default ScrollButton;
