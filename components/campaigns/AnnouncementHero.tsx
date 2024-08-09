import { useEffect, useState } from 'react';

import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import Container from '../layout/Container';
import Banner from './AnnouncementBanner';
import { banners } from './banners';

interface IAnnouncementHeroProps {
  className?: string;
  small?: boolean;
  hideVideo?: boolean;
}

/**
 * @param {string} props.className - The class name of the announcement hero
 * @param {Boolean} props.small - Whether the banner is small
 * @param {Boolean} props.hideVideo - Whether the video should be hidden
 * @description The announcement hero
 */
export default function AnnouncementHero({ className = '', small = false }: IAnnouncementHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const len = banners.length;
  const numberOfVisibleBanners = banners.filter((banner) => banner.show).length;

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? len - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === len - 1 ? 0 : prevIndex + 1));
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex((index) => index + 1), 5000);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  if (numberOfVisibleBanners === 0) {
    return null;
  }

  return (
    <Container as='section' padding='' className='text-center'>
      <div className='relative flex flex-row items-center justify-center overflow-x-hidden md:gap-4'>
        {numberOfVisibleBanners > 1 && (
          <div
            className={`absolute left-0 top-1/2 z-10 mb-2 flex size-8 -translate-y-1/2 cursor-pointer
          items-center justify-center rounded-full bg-primary-500 opacity-50 hover:bg-primary-600 md:opacity-100`}
            onClick={goToPrevious}
          >
            <ArrowLeft className='w-4 text-white' />
          </div>
        )}
        <div className='relative flex w-5/6 flex-col items-center justify-center gap-2'>
          <div className='relative flex min-h-72 w-full items-center justify-center overflow-hidden lg:h-[17rem] lg:w-[38rem]'>
            {banners.map(
              (banner, index) =>
                banner.show && (
                  <Banner
                    key={index}
                    title={banner.title}
                    dateLocation={banner.dateLocation}
                    cfaText={banner.cfaText}
                    eventName={banner.eventName}
                    cfpDeadline={banner.cfpDeadline}
                    link={banner.link}
                    city={banner.city}
                    activeBanner={index === activeIndex % len}
                    className={className}
                    small={small}
                  />
                )
            )}
          </div>
          <div className='m-auto flex justify-center'>
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`mx-1 size-2 cursor-pointer rounded-full ${
                  activeIndex % len === index ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                onClick={() => goToIndex(index)}
              />
            ))}
          </div>
        </div>
        {numberOfVisibleBanners > 1 && (
          <div
            className={`absolute right-0 top-1/2 z-10 mb-2 size-8 -translate-y-1/2 cursor-pointer
                      rounded-full bg-primary-500 opacity-50 hover:bg-primary-600 md:opacity-100`}
            onClick={goToNext}
          >
            <ArrowRight className='text-white' />
          </div>
        )}
      </div>
    </Container>
  );
}
