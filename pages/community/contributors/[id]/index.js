import React from 'react'
import GenericLayout from '../../../../components/layout/GenericLayout'

function Index() {
    const image = '/img/social/website-card.png';
  return (
    <GenericLayout
      title="AsyncAPI Ambassador Program"
      description="The home for developer communities"
      image={image}
      hideBanner={true}
      wide
    >
      <h1>Jel</h1>
    </GenericLayout>
  );
}

export default Index