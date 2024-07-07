import type { Meta, StoryObj } from '@storybook/react';

import SelectTags from './Tags';

const meta: Meta<typeof SelectTags> = {
  title: 'Components/Tags',
  component: SelectTags,
  argTypes: {
    name: {
      control: { type: 'text' }
    },
    bgColor: {
      control: { type: 'text' }
    },
    borderColor: {
      control: { type: 'text' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SelectTags>;

export const DefaultTag: Story = {
  args: {
    name: 'Default',
    bgColor: 'bg-gray-200',
    borderColor: 'border-gray-200'
  }
};
