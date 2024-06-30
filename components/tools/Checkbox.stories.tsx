import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import type { CheckboxProps } from './Checkbox';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const DefaultCheckbox: Story = (args: CheckboxProps) => {
  const [{ checked }, updateArgs] = useArgs();

  const handleClickOption = () => {
    updateArgs({ checked: !checked });
  };

  return <Checkbox {...args} checked={checked} handleClickOption={handleClickOption} />;
};

DefaultCheckbox.args = {
  name: 'Check me!',
  checked: true,
  bgColor: 'bg-white',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-600',
  checkedStateBgColor: 'bg-secondary-600',
  checkedStateTextColor: 'text-white'
};
