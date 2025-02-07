import React from 'react';

import { goldSponsors } from './GoldSponsorsList';
import SponsorImage from './SponsorImage';

interface GoldSponsorsProps {
  className?: string;
  showSupportBanner?: boolean;
}

/**
 * @description This component displays Gold Sponsors.
 * @param {GoldSponsorsProps} props - The props for GoldSponsors component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {boolean} props.showSupportBanner - Indicates whether support banner should be displayed.
 */
export default function GoldSponsors({ className = '' }: GoldSponsorsProps): React.ReactNode {
  return (
    <div className={`text-center ${className}`}>
      <div className='mb-8 flex flex-wrap items-center justify-center md:px-4'>
        {goldSponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.website}
            target='_blank'
            className='relative block w-2/3 p-4 text-center sm:w-1/2 sm:p-0 md:w-1/3 lg:w-1/5'
            rel='noopener noreferrer'
            data-testid='GoldSponsors-link'
          >
            <SponsorImage
              src={sponsor.imageSrc}
              alt={sponsor.altText}
              className={sponsor.imageClass}
              data-testid='GoldSponsors-img'
            />
          </a>
        ))}
      </div>
    </div>
  );
}
