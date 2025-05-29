import React from 'react';

import Accordion from '@/components/Accordion/Accordion';

import { faqList } from './FAQList';

/**
 * This is the FAQ component.
 * It tells the user about the frequently asked questions.
 * It has been created to render FAQ list inside MDX file.
 */
export default function FAQ() {
  return <Accordion accordionItems={faqList} />;
}
