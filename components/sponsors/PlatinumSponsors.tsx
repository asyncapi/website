import React from 'react';

import { platinumSponsors } from './PlatinumSponsorsList';
import SponsorImage from './SponsorImage';

interface SponsorsProps {
  className?: string;
  showSupportBanner?: boolean;
}

/**
 * This component displays Platinum Sponsors with a premium, professional layout.
 * @param {SponsorsProps} props - The props for Sponsors component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {boolean} props.showSupportBanner - Indicates whether support banner should be displayed.
 */
export default function PlatinumSponsors({ className = '', showSupportBanner = true }: SponsorsProps): React.ReactNode {
  return (
    <div className={`text-center ${className}`}>
      <div className='mx-auto max-w-4xl px-4 py-2'>
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-8'>
          {platinumSponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.website}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-center rounded-xl border border-gray-100 bg-white px-8 py-4 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md'
              data-testid='Sponsors-link'
            >
              <SponsorImage
                src={sponsor.imageSrc}
                alt={sponsor.altText}
                className={sponsor.imageClass}
                data-testid='Sponsors-img'
              />
            </a>
          ))}
        </div>
      </div>
      {showSupportBanner && (
        <div className='mt-6 px-4'>
          <span className='text-gray-500'>Want to become a sponsor?</span>{' '}
          <a
            href='https://opencollective.com/asyncapi'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium text-primary-600 transition-colors hover:text-primary-700'
          >
            Support us!
          </a>
        </div>
      )}
    </div>
  );
}
