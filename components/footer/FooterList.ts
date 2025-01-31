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
