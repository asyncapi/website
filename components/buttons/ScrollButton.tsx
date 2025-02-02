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
    <div className='fixed bottom-6 right-6 z-40 m-0 flex w-12'>
      {backToTopButton && (
        <button className='rounded-full border border-black/25 bg-white shadow-darkGunMetal' onClick={scrollUp}>
          <Image src={scrollImage} alt='scroll to top' width={120} height={120} />
        </button>
      )}
    </div>
  );
}

export default ScrollButton;
