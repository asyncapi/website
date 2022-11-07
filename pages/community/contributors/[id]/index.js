import { useRouter } from 'next/router';
import React from 'react'
import IconGithub from '../../../../components/icons/Github';
import IconLinkedIn from '../../../../components/icons/LinkedIn';
import IconTwitter from '../../../../components/icons/Twitter';
import GenericLayout from '../../../../components/layout/GenericLayout'
import Heading from '../../../../components/typography/Heading';

function Index() {
    const image = '/img/social/website-card.png';
    const routeData = useRouter()
    const profile = routeData.query
  return (
    <GenericLayout
      title="AsyncAPI Ambassador Program"
      description="The home for developer communities"
      image={image}
      hideBanner={true}
      wide
    >
      <div className="mt-20 flex justify-between items-center">
        <div className="w-[65%]">
          <Heading typeStyle="heading-xl" className="countdown-text-gradient">
            {profile.name}
          </Heading>
          <div className="mt-4 flex items-center">
            <span>{profile.countryFlag}</span>
            <span className="font-bold ml-2">{profile.country}</span>
          </div>
          <div className="mt-10">
            <Heading typeStyle="body-lg">{profile.bio}</Heading>
          </div>
          <div className="mt-10 flex items-center">
            <a
              href={profile.twitter}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              <div className="p-2 bg-pink-500 rounded-full w-[40px]">
                <IconTwitter className="fill-white" />
              </div>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              <div className="p-2 bg-pink-500 rounded-full w-[40px] ml-4">
                <IconGithub className="fill-white" />
              </div>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              <div className="p-2 bg-pink-500 rounded-full w-[40px] ml-4">
                <IconLinkedIn className="fill-white" />
              </div>
            </a>
          </div>
        </div>
        <div>
          <img
            src={profile.img}
            alt={profile.name}
            className="w-[350px] rounded-lg"
          />
        </div>
      </div>
    </GenericLayout>
  );
}

export default Index