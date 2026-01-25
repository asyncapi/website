import type { Meta, StoryObj } from '@storybook/react';

import Remember from './Remember';

const meta: Meta<typeof Remember> = {
  title: 'Components/Remember',
  component: Remember
};

export default meta;

type Story = StoryObj<typeof Remember>;

export const DefaultRemember: Story = {
  args: {
    children: 'Always validate your AsyncAPI documents before deploying them to production.'
  }
};

export const CustomTitleRemember: Story = {
  args: {
    title: 'Important Note',
    children: 'Make sure to review the AsyncAPI specification documentation for the latest updates.'
  }
};
