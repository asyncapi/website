import React from 'react'
import GenericLayout from '../../../components/layout/GenericLayout'

function Index() {
    const image = '/img/social/website-card.png';
  return (
    <GenericLayout
      title="AsyncAPI Ambassador Program"
      description="The home for developer communities"
      image={image}
      hideBanner={true}
      wide
    ></GenericLayout>
  );
}

export default Index