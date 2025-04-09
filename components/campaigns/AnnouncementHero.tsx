import React, { useEffect, useMemo, useState } from 'react';

import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import Container from '../layout/Container';
import Banner from './AnnouncementBanner';
import { banners, shouldShowBanner } from './banners';

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

  const visibleBanners = useMemo(
    () => banners.filter((banner) => shouldShowBanner(banner.cfpDeadline)),
    []
  );
  const numberOfVisibleBanners = visibleBanners.length;

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? numberOfVisibleBanners - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === numberOfVisibleBanners - 1 ? 0 : prevIndex + 1));
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (numberOfVisibleBanners > 1) {
      const interval = setInterval(() => {
        setActiveIndex((index) => (index + 1) % numberOfVisibleBanners);
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [numberOfVisibleBanners]);

  if (numberOfVisibleBanners === 0) {
    return null;
  }

  return (
    <Container as="section" padding="" className="text-center">
      <div className="relative flex flex-row items-center justify-center gap-2 overflow-visible sm:gap-4">
        {numberOfVisibleBanners > 1 && (
          <div
            className="absolute -left-6 top-1/2 z-30 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary-500 opacity-75 hover:bg-primary-600 sm:-left-8 lg:-left-10"
            onClick={goToPrevious}
          >
            <ArrowLeft className="text-white" />
          </div>
        )}
        <div className="relative flex w-full flex-col items-center justify-center gap-4 px-4 xs:w-11/12 sm:w-4/5 md:w-5/6 lg:w-3/4">
          <div className="relative flex min-h-72 w-full justify-center overflow-hidden sm:min-h-56 lg:h-80 lg:min-h-64 lg:w-[42rem]">
            {visibleBanners.map((banner, index) => {
              const isVisible = index === activeIndex;

              if (!isVisible) return null;

              return (
                <Banner
                  key={index}
                  title={banner.title}
                  dateLocation={banner.dateLocation}
                  cfaText={banner.cfaText}
                  eventName={banner.eventName}
                  cfpDeadline={banner.cfpDeadline}
                  link={banner.link}
                  city={banner.city}
                  activeBanner={isVisible}
                  className={className}
                  small={small}
                />
              );
            })}
          </div>
          <div className="m-auto flex justify-center">
            {visibleBanners.map((_, index) => (
              <div
                key={index}
                className={`mx-1 size-2 cursor-pointer rounded-full ${
                  activeIndex === index ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                onClick={() => goToIndex(index)}
              />
            ))}
          </div>
        </div>
        {numberOfVisibleBanners > 1 && (
          <div
            className="absolute -right-6 top-1/2 z-30 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary-500 opacity-75 hover:bg-primary-600 sm:-right-8 lg:-right-10"
            onClick={goToNext}
          >
            <ArrowRight className="text-white" />
          </div>
        )}
      </div>
    </Container>
  );
}