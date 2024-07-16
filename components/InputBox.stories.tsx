import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import type { InputBoxProps } from './InputBox';
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
    const [{ value }, updateValue] = useArgs();

    const setValue = (newValue: string) => {
      updateValue({ inputValue: newValue });
    };

    return <InputBox {...args} inputValue={value} setInput={setValue} />;
  }
};

export const TextInput: Story = {
  ...Input,

  args: {
    inputType: 'text',
    inputName: 'Name',
    placeholder: 'AsyncAPI Initiative'
  }
};

export const EmailInput: Story = {
  ...Input,

  args: {
    inputType: 'email',
    inputName: 'Email',
    placeholder: 'contributor@asyncapi.com'
  }
};
