import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import type { ToggleProps } from '@/types/components/tools/TogglePropsType';

import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const DefaultToggle: Story = {
  args: {
    checked: true,
    label: 'Toggle me!'
  },

  render: (args: ToggleProps) => {
    const [{ checked }, updateArgs] = useArgs();

    const setChecked = () => {
      updateArgs({ checked: !checked });
    };

    return <Toggle {...args} checked={checked} setChecked={setChecked} />;
  }
};

export const ColorfulToggle: Story = {
  ...DefaultToggle,

  args: {
    ...DefaultToggle.args,
    bgColor: 'bg-gray-200',
    checkedStateBgColor: 'bg-primary-500'
  }
};
