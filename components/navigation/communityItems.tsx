import type React from 'react';

import IconAmbassador from '../icons/Ambassador';
import IconContributing from '../icons/Contributing';
import IconDashboard from '../icons/Dashboard';
import IconGithubOrganization from '../icons/GithubOrganization';
import IconMeetings from '../icons/Meetings';
import IconModelina from '../icons/Modelina';
import IconNewsroom from '../icons/Newsroom';
import IconSlack from '../icons/Slack';
import IconTSC from '../icons/TSC';

interface CommunityItem {
  icon: React.ComponentType<any>;
  title: string;
  href: string;
  target?: string;
  description: string;
}

const communityItems: CommunityItem[] = [
  {
    icon: IconGithubOrganization,
    title: 'GitHub Organization',
    href: 'https://github.com/asyncapi',
    target: '_blank',
    description: 'Want to sneak in the code? Everything we do is open-sourced in our GitHub organization.'
  },
  {
    icon: IconSlack,
    title: 'Slack Workspace',
    href: 'https://asyncapi.com/slack-invite',
    target: '_blank',
    description: "Need help? Want to share something? Join our Slack workspace. We're nice people :)"
  },
  {
    icon: IconContributing,
    title: 'Contributing',
    href: 'https://github.com/asyncapi?type=source#-contribute-to-asyncapi',
    target: '_blank',
    description:
      'We are always welcoming and looking for contributions. If you are interested check out our contribution guide.'
  },
  {
    icon: IconTSC,
    title: 'Technical Steering Committee',
    href: '/community/tsc',
    description: 'Get to know what is a TSC member, how you can become one, and meet our current TSC members.'
  },
  {
    icon: IconAmbassador,
    title: 'Ambassadors',
    href: '/community/ambassadors',
    description: 'Passionate about APIs? Become an AsyncAPI Ambassador and help shape the future of APIs.'
  },
  {
    icon: IconModelina,
    title: 'Board Members',
    href: '/community/board',
    description: 'Get to know what is a Board member, how you can become one, and meet our current board members.'
  },
  {
    icon: IconDashboard,
    title: 'Dashboard',
    href: '/community/dashboard',
    description:
      'Just need a good first issue to start your contribution journey? or want to see what topics are hot in discussion?'
  },
  {
    icon: IconMeetings,
    title: 'Events',
    href: '/community/events',
    description: 'See what events and meetings are organized under AsyncAPI umbrella and join one of them.'
  },
  {
    icon: IconNewsroom,
    title: 'Newsroom',
    href: '/community/newsroom',
    description: 'Get upto date with the recent activity in the initiative.'
  }
];

export default communityItems;
