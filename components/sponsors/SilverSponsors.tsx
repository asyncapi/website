import React from 'react';

import { Silversponsors } from './SilverSponsorsList';
import SponsorImage from './SponsorImage';

interface SilverSponsorsProps {
  className: string;
  showSupportBanner: boolean;
}

/**
 * This component displays Silver Sponsors.
 * @param {SilverSponsorsProps} props - The props for SilverSponsors component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {boolean} props.showSupportBanner - Indicates whether support banner should be displayed.
 */
export default function SilverSponsors({ className = '' }: SilverSponsorsProps): React.ReactNode {
  return (
    <div className={`text-center ${className}`}>
      <div className='mb-8 flex flex-wrap items-center justify-center md:px-4'>
        {Silversponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.website}
            target='_blank'
            className='relative block w-2/3 p-4 text-center sm:w-1/2 md:w-1/3 lg:w-1/4'
            rel='noopener noreferrer'
            data-testid='SilverSponsors-link'
          >
            <SponsorImage
              src={sponsor.imageSrc}
              alt={sponsor.altText}
              className={sponsor.imageClass}
              data-testid='SilverSponsors-img'
            />
          </a>
        ))}
      </div>
    </div>
  );
}
