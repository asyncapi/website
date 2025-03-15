import type { SponsorType } from '@/types/components/sponsors/SponsorType';

export const sponsors: SponsorType[] = [
  {
    name: 'Solace',
    website: 'https://www.solace.com',
    imageSrc: '/img/sponsors/solace.png',
    altText: 'Solace',
    imageClass: 'inline-block px-4 sm:h-12'
  },
  {
    name: 'Gravitee.io',
    website: 'https://www.gravitee.io',
    imageSrc: '/img/sponsors/gravitee.io_logo.jpg',
    altText: 'Gravitee.io',
    imageClass: 'inline-block px-4 sm:h-14'
  },
  {
    name: 'Postman',
    website: 'https://www.postman.com',
    imageSrc: '/img/sponsors/postman.png',
    altText: 'Postman',
    imageClass: 'inline-block px-4 sm:h-18'
  }
];
