import { useEffect, useState } from 'react';

export default function ScrollButton() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setIsBottom(scrollTop + windowHeight >= fullHeight - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isBottom) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-purple-600 text-white shadow-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-lg"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}


// import React, { useEffect, useState } from 'react';

// /**
//  * @returns {React.JSX.Element} The ScrollButton component
//  * @description The ScrollButton component is a button that scrolls the user to the top of the page.
//  */
// function ScrollButton() {
//   const [backToTopButton, setBackToTopButton] = useState(false);
//   const scrollImage = '/img/loaders/scroll.svg';

//   useEffect(() => {
//     window.addEventListener('scroll', () => {
//       if (window.scrollY > 150) {
//         setBackToTopButton(true);
//       } else {
//         setBackToTopButton(false);
//       }
//     });
//   }, []);

//   const scrollUp = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   return (
//     <div className='fixed bottom-14 right-4 z-40 h-16 w-12'>
//       {backToTopButton && (
//         <button
//           className='rounded-full bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#8851FB]'
//           onClick={scrollUp}
//         >
//           <img src={scrollImage} alt='scroll to top' />
//         </button>
//       )}
//     </div>
//   );
// }

// export default ScrollButton;
