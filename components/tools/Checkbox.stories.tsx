import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import type { CheckboxProps } from '@/types/components/tools/CheckboxPropsType';

import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const DefaultCheckbox: Story = {
  args: {
    name: 'Check me!',
    checked: true
  },

  render: (args: CheckboxProps) => {
    const [{ checked }, updateArgs] = useArgs();

    const handleClickOption = () => {
      updateArgs({ checked: !checked });
    };

    return <Checkbox {...args} checked={checked} handleClickOption={handleClickOption} />;
  }
};

export const ColorfulCheckbox: Story = {
  ...DefaultCheckbox,

  args: {
    ...DefaultCheckbox.args,
    bgColor: 'bg-gray-200',
    textColor: 'text-primary-500',
    borderColor: 'border-primary-500',
    checkedStateBgColor: 'bg-primary-500',
    checkedStateTextColor: 'text-white'
  }
};
