import React from 'react';

import AccordionItem from './AccordionItem';

interface AccordionItemType {
  // eslint-disable-next-line prettier/prettier

  /** The title of the accordion item. */
  title: string;

  /** The content of the accordion item. */
  content: React.ReactNode;
}

export interface AccordionProps {
  // eslint-disable-next-line prettier/prettier

  /** The array of accordion items. Each item object contains the title(string) and the content(React.ReactNode) of accordion item. */
  accordionItems: AccordionItemType[];
}

/**
 * This Accordion component is a vertically stacked list of items where only one item can be expanded at a time. It is responsible for rendering the accordion items.
 */
const Accordion = ({ accordionItems = [] }: AccordionProps) => {
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
};

export default Accordion;
