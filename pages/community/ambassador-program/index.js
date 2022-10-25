import React from 'react'
import Button from '../../../components/buttons/Button';
import GenericLayout from '../../../components/layout/GenericLayout'
import Heading from '../../../components/typography/Heading';
import IconRocket from '../../../components/icons/Rocket';
import Link from 'next/link';

const data = [
  {
    title: 'Written content',
    details:
      'Write guides, step-by-step tutorials, or best practice cheat sheets for the Snyk blog or your own.',
    icon: '',
  },
  {
    title: 'Video content',
    details:
      'Produce educational videos or Snyk developer training for Snyk’s YouTube channel or your own.',
    icon: '',
  },
  {
    title: 'Live streams',
    details:
      'Moderate or host videos and live streams that demo Snyk and promote AppSec and DevSecOps.',
    icon: '',
  },
  {
    title: 'Give talks',
    details:
      'Speak at meetups and conferences, and we’ll help with slides, abstract submissions, and travel budget.',
    icon: '',
  },
  {
    title: 'Learning apps',
    details:
      'Build educational applications and games to teach developers about application security.',
    icon: '',
  },
  {
    title: 'Build educational security apps',
    details:
      'Develop intentionally vulnerable applications for hands-on learning in any language.',
    icon: '',
  },
  {
    title: 'Snyk Advisor',
    details:
      'Collaborate with the Snyk Advisor team to boost awareness of open source security and package health.',
    icon: '',
  },
  {
    title: 'Snyk CLI',
    details:
      'Participate in issue triage or code contribution to the open source Snyk CLI project and collaborate with Snyk’s developer team.',
    icon: '',
  }
];

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
      <div className="flex justify-between items-center">
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
          <Button
            className="block md:inline-block focus:outline-none mt-10 bg-black text-center sm:text-left"
            text="Apply now"
            href="https://github.com/orgs/asyncapi/discussions"
            target="_blank"
            icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
          />
        </div>
        <div className="w-[50%]">
          <img
            src="/img/homepage/ambassador-cover.svg"
            alt="ambassador-cover"
            className="w-full"
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="w-full h-[400px] bg-ambassadorCover bg-cover bg-center rounded-lg" />
        <div className="flex justify-center">
          <div className="text-center mt-10 w-[55%]">
            <Heading typeStyle="heading-lg">
              AsyncAPI Ambassador Contributions
            </Heading>
            <Heading
              typeStyle="body-sm"
              textColor="text-gray-700"
              className="text-slate-500 mt-5"
            >
              AsyncAPI Ambassadors are just as passionate about APIs as AsyncAPI
              is — and they share their interest, expertise, and excitement
              within their communities to help other developers and engineers
              build better software. Here are few ways to contribute
            </Heading>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((link) => (
            <li key={link.title}>{link.title}</li>
          ))}
        </ul>
      </div>
    </GenericLayout>
  );
}

export default Index