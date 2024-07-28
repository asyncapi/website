import type { Meta, StoryObj } from '@storybook/react';

import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader
};

export default meta;

type Story = StoryObj<typeof Loader>;

const DarkBackgroundDecorator = (Story: any) => (
  <div style={{ backgroundColor: '#1b1130', padding: '12px' }}>
    <Story />
  </div>
);

export const TextLoader: Story = {
  args: {
    loaderText: 'Loading...'
  }
};

export const TextLoaderInDark: Story = {
  decorators: [DarkBackgroundDecorator],
  args: {
    loaderText: 'Loading...',
    dark: true
  }
};

export const PulsatingTextLoader: Story = {
  args: {
    loaderText: 'Loading...',
    pulsating: true
  }
};

export const PulsatingTextLoaderInDark: Story = {
  decorators: [DarkBackgroundDecorator],
  args: {
    loaderText: 'Loading...',
    dark: true,
    pulsating: true
  }
};

export const CircularAnimationLoader: Story = {
  args: {
    loaderType: 'circular'
  }
};

export const CircularAnimationLoaderInDark: Story = {
  decorators: [DarkBackgroundDecorator],
  args: {
    loaderType: 'circular',
    dark: true
  }
};

export const PulsatingIconLoader: Story = {
  args: {
    loaderType: 'icon',
    pulsating: true
  }
};

export const PulsatingIconLoaderInDark: Story = {
  decorators: [DarkBackgroundDecorator],
  args: {
    loaderType: 'icon',
    dark: true,
    pulsating: true
  }
};

export const CircularAnimationTextLoader: Story = {
  args: {
    loaderType: 'circular',
    loaderText: 'Loading...'
  }
};

export const CircularAnimationTextLoaderInDark: Story = {
  decorators: [DarkBackgroundDecorator],
  args: {
    loaderType: 'circular',
    loaderText: 'Loading...',
    dark: true
  }
};

export const PulsatingIconTextLoader: Story = {
  args: {
    loaderType: 'icon',
    loaderText: 'Loading...',
    pulsating: true
  }
};

export const PulsatingIconTextLoaderInDark: Story = {
  decorators: [DarkBackgroundDecorator],
  args: {
    loaderType: 'icon',
    loaderText: 'Loading...',
    dark: true,
    pulsating: true
  }
};
