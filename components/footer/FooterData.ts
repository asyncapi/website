// Centralized footer data - Pure data without React components
// This file can be imported by both React components and Cypress tests

import communityLinksConfig from '../../config/community-links.json';

export interface FooterLink {
  url: string;
  label: string;
}

export interface SocialMediaData {
  url: string;
  label: string;
}

export interface NewsLink {
  url: string;
  label: string;
}

export const initiativeLinks: FooterLink[] = [
  {
    label: 'About',
    url: '/about'
  },
  {
    label: 'Blog',
    url: '/blog'
  },
  {
    label: 'Brand',
    url: 'https://github.com/asyncapi/brand/blob/master/brand-guidelines/README.md'
  },
  {
    label: 'Finance',
    url: '/finance'
  },
  {
    label: 'FAQs',
    url: '/about#faqs'
  }
];

export const socialMediaData: SocialMediaData[] = [
  {
    url: communityLinksConfig.twitter,
    label: 'Twitter'
  },
  {
    url: communityLinksConfig.github,
    label: 'GitHub'
  },
  {
    url: communityLinksConfig.linkedin,
    label: 'LinkedIn'
  },
  {
    url: communityLinksConfig.youtube,
    label: 'YouTube'
  },
  {
    url: communityLinksConfig.slack,
    label: 'Slack'
  },
  {
    url: communityLinksConfig.twitch,
    label: 'Twitch'
  }
];

export const newsLinks: NewsLink[] = [
  {
    url: communityLinksConfig.email,
    label: 'Email Us'
  }
];

export const footerMiscData = {
  netlifyLink: 'https://netlify.com'
};

export const footerData = {
  initiativeLinks,
  socialMediaData,
  newsLinks,
  ...footerMiscData
};
