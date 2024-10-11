import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const DefaultAvatar: Story = {
  args: {
    name: 'Avatar',
    link: 'https://www.asyncapi.com/',
    photo: '/favicon-32x32.png'
  }
};
