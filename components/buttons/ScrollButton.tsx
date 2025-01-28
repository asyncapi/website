import Image from 'next/image';
import React, { useEffect, useState } from 'react';

/**
 * @returns {JSX.Element} The ScrollButton component
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
    <div className='fixed bottom-4 right-4 z-40'>
      {backToTopButton && (
        <button
          className='flex size-10 items-center justify-center rounded-full bg-white shadow-md '
          onClick={scrollUp}
        >
          <Image src={scrollImage} alt='scroll to top' height={30} width={30} />
        </button>
      )}
    </div>
  );
}

export default ScrollButton;
