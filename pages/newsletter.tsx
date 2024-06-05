import React from 'react';

import Head from '@/components/Head';
import Container from '@/components/layout/Container';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';

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
