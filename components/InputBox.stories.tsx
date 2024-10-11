import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import type { InputBoxProps } from '@/types/components/InputBoxPropsType';
import { InputTypes } from '@/types/components/InputBoxPropsType';

import InputBox from './InputBox';

const meta: Meta<typeof InputBox> = {
  title: 'Components/InputBox',
  component: InputBox
};

export default meta;

type Story = StoryObj<typeof InputBox>;

const Input: Story = {
  args: {
    inputValue: ''
  },

  render: (args: InputBoxProps) => {
    const [{ inputValue }, updateArgs] = useArgs();

    const setValue = (newValue: string) => {
      updateArgs({ inputValue: newValue });
    };

    return <InputBox {...args} inputValue={inputValue} setInput={setValue} />;
  }
};

export const TextInput: Story = {
  ...Input,

  args: {
    inputType: InputTypes.TEXT,
    inputName: 'Name',
    placeholder: 'AsyncAPI Initiative'
  }
};

export const EmailInput: Story = {
  ...Input,

  args: {
    inputType: InputTypes.EMAIL,
    inputName: 'Email',
    placeholder: 'press@asyncapi.io'
  }
};
