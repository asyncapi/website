import React from 'react';

import Head from '@/components/Head';
import Container from '@/components/layout/Container';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';
import { Redirect } from '@/utils/redirect';

/**
 * @description component that is used on landing page to embed newsletter and subscription option.
 */
export default function NewsletterIndexPage() {
  Redirect();

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
