import type { Meta, StoryObj } from '@storybook/react';

import TextLink from './TextLink';

const meta: Meta<typeof TextLink> = {
  title: 'Components/Typography/TextLink',
  component: TextLink,
};

export default meta;

type Story = StoryObj<typeof TextLink>;

export const DefaultLink: Story = {
  args: {
    href: 'https://www.asyncapi.com',
    children: 'Visit AsyncAPI Website',
  },
};

export const InternalLink: Story = {
  args: {
    href: '/docs',
    target: '_self',
    children: 'Go to Documentation',
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://github.com/asyncapi',
    target: '_blank',
    children: 'AsyncAPI on GitHub',
  },
};

export const LinkWithCustomStyling: Story = {
  args: {
    href: 'https://www.asyncapi.com',
    className: 'text-lg font-bold',
    children: 'Custom Styled Link',
  },
};
