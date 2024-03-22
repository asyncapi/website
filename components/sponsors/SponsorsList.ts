import type { SponsorType } from '@/types/components/sponsors/SponsorType';

export const sponsors : SponsorType[] = [
  {
    name: 'IBM',
    website: 'https://www.ibm.com',
    imageSrc: '/img/sponsors/ibm.png',
    altText: 'IBM',
    imageClass: 'inline-block px-4 sm:h-14'
  },
  {
    name: 'Solace',
    website: 'https://www.solace.com',
    imageSrc: '/img/sponsors/solace.png',
    altText: 'Solace',
    imageClass: 'inline-block px-4 sm:h-12'
  }
];
