import ContributorsPage from '@/components/contributors/Contributors';
import Container from '@/components/layout/Container';
import GenericLayout from '@/components/layout/GenericLayout';
import React from 'react';

/**
 * @description Contributors page.
 */
export default function Contributors() {
  const description = "Learn about the folks building AsyncAPI.";
  const image = '/img/social/community-contributors.webp';

  return (
    <GenericLayout title='AsyncAPI Contributors' description={description} image={image} wide>
      <Container wide>
        <ContributorsPage />
      </Container>
    </GenericLayout>
  );
}
