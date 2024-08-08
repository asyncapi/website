import type { Meta, StoryObj } from '@storybook/react';

import type { AccordionItemType } from '@/types/components/AccordionItemType';

import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const sampleAccordionItemList: AccordionItemType[] = [
  {
    title: 'Accordion Item 1',
    content: 'This is the content of accordion item 1.'
  },
  {
    title: 'Accordion Item 2',
    content: 'This is the content of accordion item 2.'
  },
  {
    title: 'Accordion Item 3',
    content: 'This is the content of accordion item 3.'
  }
];

export const SampleAccordion: Story = {
  args: {
    accordionItems: sampleAccordionItemList
  }
};
