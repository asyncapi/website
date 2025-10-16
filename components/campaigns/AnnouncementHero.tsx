import React, { useEffect, useMemo, useState } from 'react';

import { banners, shouldShowBanner } from './banners';
import ConferenceBanner from './ConferenceBanner';

interface IAnnouncementHeroProps {
  className?: string;
  small?: boolean;
  hideVideo?: boolean;
}

/**
 * @param {string} props.className - The class name of the announcement hero
 * @param {Boolean} props.small - Whether the banner is small
 * @param {Boolean} props.hideVideo - Whether the video should be hidden
 * @description The announcement hero - displays one rotating banner that changes every 2 seconds
 */
export default function AnnouncementHero({ className = '' }: IAnnouncementHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleBanners = useMemo(() => banners.filter((banner) => shouldShowBanner(banner.cfpDeadline)), [banners]);

  useEffect(() => {
    if (visibleBanners.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % visibleBanners.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [visibleBanners.length]);

  if (visibleBanners.length === 0) {
    return null;
  }

  const currentBanner = visibleBanners[currentIndex];

  return (
    <div className={className}>
      <ConferenceBanner
        key={currentIndex}
        title={currentBanner.title}
        city={currentBanner.city}
        dateLocation={currentBanner.dateLocation}
        cfaText={currentBanner.cfaText}
        link={currentBanner.link}
      />
    </div>
  );
}
