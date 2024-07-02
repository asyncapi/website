import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import Heading from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    level: {
      options: Object.values(HeadingLevel),
      control: { type: 'select' }
    },
    typeStyle: {
      options: Object.values(HeadingTypeStyle),
      control: { type: 'select' }
    },
    children: {
      control: { type: 'text' }
    },
    className: {
      control: { type: 'text' }
    },
    textColor: {
      table: {
        disable: true
      }
    },
    id: {
      table: {
        disable: true
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Headings: Story = {
  args: {
    level: HeadingLevel.h1,
    typeStyle: HeadingTypeStyle.lg,
    children: 'Quick brown fox jumps over the lazy dog'
  }
};

export const HeadingsLevel = () => (
  <>
    <Heading level={HeadingLevel.h1}>Heading 1</Heading>
    <Heading level={HeadingLevel.h2}>Heading 2</Heading>
    <Heading level={HeadingLevel.h3}>Heading 3</Heading>
    <Heading level={HeadingLevel.h4}>Heading 4</Heading>
    <Heading level={HeadingLevel.h5}>Heading 5</Heading>
    <Heading level={HeadingLevel.h6}>Heading 6</Heading>
  </>
);

export const HeadingsTypeStyle = () => (
  <>
    <Heading typeStyle={HeadingTypeStyle.xl}>Heading XL</Heading>
    <Heading typeStyle={HeadingTypeStyle.lg}>Heading LG</Heading>
    <Heading typeStyle={HeadingTypeStyle.md}>Heading MD</Heading>
    <Heading typeStyle={HeadingTypeStyle.mdSemibold}>Heading MD Semibold</Heading>
    <Heading typeStyle={HeadingTypeStyle.sm}>Heading SM</Heading>
    <Heading typeStyle={HeadingTypeStyle.smSemibold}>Heading SM Semibold</Heading>
    <Heading typeStyle={HeadingTypeStyle.xs}>Heading XS</Heading>
    <Heading typeStyle={HeadingTypeStyle.xsSemibold}>Heading XS Semibold</Heading>
    <Heading typeStyle={HeadingTypeStyle.bodyLg}>Body LG</Heading>
    <Heading typeStyle={HeadingTypeStyle.bodyMd}>Body MD</Heading>
    <Heading typeStyle={HeadingTypeStyle.bodySm}>Body SM</Heading>
  </>
);
