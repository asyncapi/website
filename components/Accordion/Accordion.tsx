import React from 'react';

import type { AccordionItemType } from '@/types/components/AccordionItemType';

import AccordionItem from './AccordionItem';

export interface AccordionProps {
  // eslint-disable-next-line prettier/prettier

  /** List of accordian items objects each containing title and content. */
  accordionItems: AccordionItemType[];
}

/**
 * This is the Accordion component. It displays a list of items that can be expanded or collapsed.
 */
export default function Accordion({ accordionItems = [] }: AccordionProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <div>
      {accordionItems.map(({ title, content }, index) => (
        <AccordionItem
          key={index}
          itemIndex={index}
          title={title}
          content={content}
          isActive={index === activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </div>
  );
}
