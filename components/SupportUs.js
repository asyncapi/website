import React from 'react';

export const supportItems = [
  {
    href: 'https://slack.com/media-kit',
    target: '_blank',
    className: 'block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5',
    rel: 'noopener noreferrer',
    src: '/img/supportus/slack.webp',
    title: 'Slack - Free Standard Subscription.'
  },
  {
    href: 'https://toast.ninja/',
    target: '_blank',
    className: 'block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5',
    rel: 'noopener noreferrer',
    src: '/img/supportus/toast.webp',
    title: 'Toast - Free services.'
  },
  {
    href: 'https://www.netlify.com/',
    target: '_blank',
    className: 'block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5',
    rel: 'noopener noreferrer',
    src: '/img/supportus/netlify.webp',
    title: 'Netlify - Free website deployment.'
  },
  {
    href: 'https://sonarcloud.io/',
    target: '_blank',
    className: 'block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5',
    rel: 'noopener noreferrer',
    src: '/img/supportus/sonarcloud.webp',
    title: 'Sonarcloud - Free tier for automated project scanning.'
  },
  {
    href: 'https://www.digitalocean.com/press/',
    target: '_blank',
    className: 'block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5',
    rel: 'noopener noreferrer',
    src: '/img/supportus/digitalocean.webp',
    title: 'DigitalOcean - 500 dollars on cloud services.'
  },
  {
    href: 'https://restream.io/',
    target: '_blank',
    className: 'block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5',
    rel: 'noopener noreferrer',
    src: '/img/supportus/restream.webp',
    title: 'Restream - Free professional plan subscription.'
  },
  {
    href: 'https://sessionize.com/',
    target: '_blank',
    className: 'block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5',
    rel: 'noopener noreferrer',
    src: '/img/supportus/sessionize.webp',
    title: 'Sessionize - Free community license for AACoT Madrid.'
  }
];

export default function SupportUs({ className = '', showSupportBanner = true }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex flex-wrap md:mb-4 sm:py-2 items-center justify-center md:px-4">
        {supportItems.map((item, index) => (
          <a key={index} href={item.href} target={item.target} className={item.className} rel={item.rel} data-testid="SupportUs-link">
            <img className="inline-block px-4 sm:h-10" src={item.src} title={item.title} data-testid="SupportUs-img"/>
          </a>
        ))}
      </div>
    </div>
  );
}