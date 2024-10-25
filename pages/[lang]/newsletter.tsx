import React from 'react';

import Head from '@/components/Head';
import Container from '@/components/layout/Container';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic';

const getStaticProps = makeStaticProps(['common']);

export { getStaticPaths, getStaticProps };

/**
 * @description component that is used on landing page to embed newsletter and subscription option.
 */
export default function NewsletterIndexPage() {
  return (
    <div>
      <Head title='Newsletter' />
      <div className='mt-12 py-12'>
        <Container wide>
          <NewsletterSubscribe />
        </Container>
      </div>
    </div>
  );
}
