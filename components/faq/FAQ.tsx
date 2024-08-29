import Accordion from '@/components/Accordion/Accordion';

import { faqList } from './FAQList';

/**
 * This is the FAQ component. It tells the user about the frequently asked questions.
 */
const FAQ = () => {
  return <Accordion accordionItems={faqList} />;
};

export default FAQ;
