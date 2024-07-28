import Accordion from '@/components/Accordion/Accordion';

import { faqList } from './FAQList';

const FAQ = () => {
  return (
    <div>
      <Accordion accordionItems={faqList} />
    </div>
  );
};

export default FAQ;
