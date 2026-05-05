import type React from 'react';

import IconGithub from '../icons/Github';
import IconLinkedIn from '../icons/LinkedIn';
import IconSlack from '../icons/Slack';
import IconTwitch from '../icons/Twitch';
import IconTwitter from '../icons/Twitter';
import IconYoutubeGray from '../icons/YouTubeGray';

export interface SocialMediaLink {
  url: string;
  label: string;
  icon: React.ReactElement;
}

export const socialMediaLinks: SocialMediaLink[] = [
  {
    url: 'https://twitter.com/AsyncAPISpec',
    label: 'Twitter',
    icon: IconTwitter({ className: 'h-8 w-5 sm:h-4 sm:w-6' })
  },
  {
    url: 'https://github.com/asyncapi',
    label: 'GitHub',
    icon: IconGithub({ className: 'h-8 w-8 sm:h-6 sm:w-6' })
  },
  {
    url: 'https://linkedin.com/company/asyncapi',
    label: 'LinkedIn',
    icon: IconLinkedIn({ className: 'h-8 w-8 sm:h-5 sm:w-5 ml-1' })
  },
  {
    url: 'https://youtube.com/asyncapi',
    label: 'YouTube',
    icon: IconYoutubeGray({ className: 'h-8 w-8 sm:h-6 sm:w-6' })
  },
  {
    url: 'https://asyncapi.com/slack-invite',
    label: 'Slack',
    icon: IconSlack({ className: 'h-8 w-8 sm:h-6 sm:w-6' })
  },
  {
    url: 'https://www.twitch.tv/asyncapi',
    label: 'Twitch',
    icon: IconTwitch({ className: 'h-8 w-8 sm:h-6 sm:w-6' })
  }
];

export interface InitiativeLink {
  label: string;
  url: string;
}

export const initiativeLinks: InitiativeLink[] = [
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

export const COMMUNITY_URLS = {
  GITHUB: {
    BASE: 'https://github.com/asyncapi/community',
    AMBASSADOR_PROGRAM:
      'https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/AMBASSADOR_PROGRAM.md',
    AMBASSADOR_ORGANIZATION:
      'https://github.com/asyncapi/community/blob/master/AMBASSADOR_ORGANIZATION.md#are-you-interested-in-becoming-an-official-asyncapi-ambassador',
    TSC_MEMBERSHIP: 'https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md',
    CONTRIBUTING: 'https://github.com/asyncapi/community/blob/master/CONTRIBUTING.md'
  },
  YOUTUBE: {
    BASE: 'https://www.youtube.com/asyncapi',
    AMBASSADOR_VIDEO_ID: '3rg_7hIb9PQ'
  },
  BLOG: {
    AMBASSADOR_PROGRAM: 'https://www.asyncapi.com/blog/asyncapi-ambassador-program'
  }
} as const;

export const AMBASSADORS_CONFIG = {
  POSTS_PER_PAGE: 6,
  YOUTUBE_VIDEO_ID: '3rg_7hIb9PQ'
} as const;

export const SOCIAL_MEDIA_BASE_URLS = {
  GITHUB: 'https://www.github.com',
  LINKEDIN: 'https://www.linkedin.com/in',
  TWITTER: 'https://www.twitter.com'
} as const;
