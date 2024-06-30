import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import type { ToggleProps } from './Toggle';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const DefaultToggle: Story = (args: ToggleProps) => {
  const [{ checked }, updateArgs] = useArgs();

  const setChecked = () => {
    updateArgs({ checked: !checked });
  };

  return <Toggle {...args} checked={checked} setChecked={setChecked} />;
};

DefaultToggle.args = {
  checked: true,
  label: 'Toggle me!'
};
