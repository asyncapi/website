import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ButtonIconPosition, ButtonSize, ButtonType } from '@/types/components/buttons/ButtonPropsType';

import AsyncAPI from '../icons/AsyncAPI';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Buttons',
  component: Button,
  argTypes: {
    text: {
      control: { type: 'text' }
    },
    type: {
      options: Object.values(ButtonType),
      control: { type: 'select' }
    },
    buttonSize: {
      options: Object.values(ButtonSize),
      control: { type: 'select' }
    },
    className: {
      control: { type: 'text' }
    },
    bgClassName: {
      control: { type: 'text' }
    },
    textClassName: {
      control: { type: 'text' }
    },
    icon: {
      options: ['AsyncAPI Icon'],
      mapping: {
        'AsyncAPI Icon': <AsyncAPI className='size-6' />
      }
    },
    iconPosition: {
      options: Object.values(ButtonIconPosition),
      control: { type: 'select' }
    },
    target: {
      control: { type: 'text' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  args: {
    text: 'Default',
    className: 'bg-gray-200 hover:bg-gray-100 text-gray-900'
  }
};

export const PrimaryButton: Story = {
  args: {
    text: 'Primary'
  }
};

export const SecondaryButton: Story = {
  args: {
    text: 'Secondary',
    className: 'border border-secondary-500 bg-secondary-100 text-secondary-500 hover:bg-secondary-500 hover:text-white'
  }
};

export const SubmitButton: Story = {
  args: {
    text: 'Submit',
    type: ButtonType.SUBMIT
  }
};

export const ResetButton: Story = {
  args: {
    text: 'Reset',
    type: ButtonType.RESET
  }
};

export const SmallButton: Story = {
  args: {
    text: 'Reset',
    buttonSize: ButtonSize.SMALL
  }
};

export const SuccessButton: Story = {
  args: {
    text: 'Success',
    className: 'bg-[#2db84c] hover:bg-[#36de5b]'
  }
};

export const WarningButton: Story = {
  args: {
    text: 'Warning',
    className: 'bg-[#fbc000] hover:bg-[#ffd400]'
  }
};

export const ErrorButton: Story = {
  args: {
    text: 'Error',
    className: 'bg-[#e25a71] hover:bg-[#ff6575]'
  }
};

export const ButtonWithIconOnLeft: Story = {
  args: {
    text: 'AsyncAPI icon on left',
    className: 'flex items-center justify-center',
    icon: 'AsyncAPI Icon',
    iconPosition: ButtonIconPosition.LEFT
  }
};

export const ButtonWithIconOnRight: Story = {
  args: {
    text: 'AsyncAPI icon on right',
    className: 'flex items-center justify-center',
    icon: 'AsyncAPI Icon',
    iconPosition: ButtonIconPosition.RIGHT
  }
};

export const ButtonWithOnlyIcon: Story = {
  args: {
    className: 'flex items-center justify-center',
    icon: 'AsyncAPI Icon',
    iconPosition: ButtonIconPosition.LEFT
  }
};
