// Centralized footer data - Pure data without React components
// This file can be imported by both React components and Cypress tests

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
    url: 'https://twitter.com/AsyncAPISpec',
    label: 'Twitter'
  },
  {
    url: 'https://github.com/asyncapi',
    label: 'GitHub'
  },
  {
    url: 'https://linkedin.com/company/asyncapi',
    label: 'LinkedIn'
  },
  {
    url: 'https://youtube.com/asyncapi',
    label: 'YouTube'
  },
  {
    url: 'https://asyncapi.com/slack-invite',
    label: 'Slack'
  },
  {
    url: 'https://www.twitch.tv/asyncapi',
    label: 'Twitch'
  }
];

export const newsLinks: NewsLink[] = [
  {
    url: 'mailto:info@asyncapi.com',
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
