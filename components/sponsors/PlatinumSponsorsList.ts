import type { SponsorType } from '@/types/components/sponsors/SponsorType';

export const platinumSponsors: SponsorType[] = [
  {
    name: 'Solace',
    website: 'https://solace.com/?utm_source=asyncapi&utm_medium=onlinereferral&utm_campaign=asyncapi_sponsorship',
    imageSrc: '/img/sponsors/solace.png',
    altText: 'Solace: powering event-driven architectures, integrations and AI',
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
  },
  {
    name: 'Kong',
    website: 'https://konghq.com/',
    imageSrc: '/img/sponsors/kong.png',
    altText: 'Kong',
    imageClass: 'inline-block px-4 sm:h-18'
  }
];
