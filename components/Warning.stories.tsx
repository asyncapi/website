import type { Meta, StoryObj } from '@storybook/react';

import Warning from './Warning';

const meta: Meta<typeof Warning> = {
  title: 'Components/Warning',
  component: Warning
};

export default meta;

type Story = StoryObj<typeof Warning>;

export const DefaultWarning: Story = {
  args: {
    title: 'Warning',
    description: 'This is a warning message. Please review the information carefully before proceeding.'
  }
};

export const DeprecationWarning: Story = {
  args: {
    title: 'Deprecated Feature',
    description: 'This feature is deprecated and will be removed in the next major version.'
  }
};
