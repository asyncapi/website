import React from 'react'
import GenericLayout from '../../../components/layout/GenericLayout'
import Heading from '../../../components/typography/Heading';

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
      <div className="mt-16 flex justify-between">
        <div className="w-[50%]">
          <h1 className="font-semibold text-3xl lg:text-5xl leading-[8rem] md:text-4xl">
            Teachers. Champions. Ambassadors!
          </h1>
          <Heading
            typeStyle="body-sm"
            textColor="text-gray-700"
            className="text-slate-500 mt-5"
          >
            Passionate about event driven architectures or message driven apis?
            Become an AsyncAPI Ambassador and help the development community
            build the future of APIs.
          </Heading>
        </div>
        <div>jdkf</div>
      </div>
    </GenericLayout>
  );
}

export default Index