import React from 'react';

import Container from '../../components/layout/Container';
import GenericLayout from '../../components/layout/GenericLayout';
import NewsroomSection from '../../components/newsroom/Newsroom';

/**
 * @description Newsroom page.
 */
export default function Newsroom() {
  const description = "Learn about what's happening in AsyncAPI.";
  const image = '/img/social/community-newsroom.webp';

  return (
    <GenericLayout title='AsyncAPI Newsroom' description={description} image={image} wide>
      <Container wide>
        <NewsroomSection />
      </Container>
    </GenericLayout>
  );
}
