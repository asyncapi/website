import type { Meta, StoryObj } from '@storybook/react';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Paragraph from './Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  argTypes: {
    typeStyle: {
      options: Object.values(ParagraphTypeStyle),
      control: { type: 'select' }
    },
    textColor: {
      control: { type: 'text' }
    },
    fontWeight: {
      control: { type: 'text' }
    },
    children: {
      control: { type: 'text' }
    },
    className: {
      control: { type: 'text' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Paragraph>;

export const Paragraphs: Story = {
  args: {
    typeStyle: ParagraphTypeStyle.lg,
    textColor: 'text-gray-700',
    fontWeight: '',
    children: 'Quick brown fox jumps over the lazy dog'
  }
};
