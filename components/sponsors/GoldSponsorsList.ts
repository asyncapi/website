import type { SponsorType } from '@/types/components/sponsors/SponsorType';

export const goldSponsors: SponsorType[] = [
  {
    name: 'IBM',
    website: 'https://www.ibm.com',
    imageSrc: '/img/sponsors/ibm.png',
    altText: 'IBM',
    imageClass: 'inline-block px-4 sm:h-14'
  },
  {
    name: 'Solace',
    website: 'https://solace.com/?utm_source=asyncapi&utm_medium=onlinereferral&utm_campaign=asyncapi_sponsorship',
    imageSrc: '/img/sponsors/solace.png',
    altText: 'Solace: powering event-driven architectures, integrations and AI',
    imageClass: 'inline-block px-4 sm:h-12'
  }
];
