import React from 'react';
import Button from '../../../components/buttons/Button';
import GenericLayout from '../../../components/layout/GenericLayout';
import Heading from '../../../components/typography/Heading';
import IconRocket from '../../../components/icons/Rocket';
import TwitterSVG from '../../../components/icons/Twitter_2';

const data = [
  {
    title: 'Written content',
    details:
      'Write guides, step-by-step tutorials, or best practice cheat sheets for the AsyncAPI blog or your own.',
    icon: '/img/illustrations/blog.svg',
  },
  {
    title: 'Video content',
    details:
      'Produce educational videos or AsyncAPI developer training for AsyncAPI’s YouTube channel or your own.',
    icon: '/img/illustrations/video-creation.svg',
  },
  {
    title: 'Live streams',
    details:
      'Moderate or host videos and live streams that demo AsyncAPI and promote the ecosystem.',
    icon: '/img/illustrations/live.svg',
  },
  {
    title: 'Give talks',
    details:
      'Speak at meetups and conferences, and we’ll help with slides, abstract submissions, and travel budget.',
    icon: '/img/illustrations/speaking.svg',
  },
  {
    title: 'Learning apps',
    details:
      'Build educational applications and games to teach developers about AsycnAPI and event driven architectures.',
    icon: '/img/illustrations/learning-app.svg',
  },
  {
    title: 'Build educational apps',
    details: 'Develop applications for hands-on learning in any language.',
    icon: '/img/illustrations/codes.svg',
  },
  {
    title: 'AsyncAPI Advisor',
    details:
      'Collaborate with the AsyncAPI team to boost awareness of open source.',
    icon: '/img/illustrations/advisor.svg',
  },
  {
    title: 'Gather Usecases',
    details: 'Collect data from existing AsyncAPI users ',
    icon: '/img/illustrations/meeting.jpg',
  },
];

const ambassadors = [
  {
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra',
    className: 'top-2 left-36',
  },
  {
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra',
    className: 'top-[10rem] left-[10rem]',
  },
  {
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra',
    className: 'top-[8rem] left-[33rem]',
  },
  {
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra',
    className: 'top-[2rem] left-[40rem]',
  },
  {
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra',
    className: 'top-[8rem] left-[50rem]',
  },
  {
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra',
    className: '-top-[2rem] left-[22rem]',
  },

  {
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra',
    className: 'top-[0rem] left-[50rem]',
  },

  {
    img: '/img/homepage/ale.jpeg',
    name: 'Alejandra',
    className: 'top-[15rem] left-[65rem]',
  },
];

const tokens = [
  {
    title: 'Education',
    details:
      'Ambassadors are provided with a budget plan that they use for personal development.',
  },
  {
    title: 'Education',
    details:
      'Ambassadors are provided with a budget plan that they use for personal development.',
  },
  {
    title: 'Education',
    details:
      'Ambassadors are provided with a budget plan that they use for personal development.',
  },
  {
    title: 'Education',
    details:
      'Ambassadors are provided with a budget plan that they use for personal development.',
  },
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
        <div className="w-[45%]">
          <h1 className="font-semibold  text-3xl lg:text-5xl leading-[8rem] md:text-4xl">
            Teachers. Champions.{' '}
            <span className="countdown-text-gradient">Ambassadors!</span>
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
            className="block md:inline-block focus:outline-none mt-10 text-center sm:text-left"
            text="Apply to become one"
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
            <li
              key={link.title}
              className="flex flex-col justify-center items-center"
            >
              <img
                src={link.icon}
                alt={link.title}
                className="w-[200px] mt-20"
              />
              <Heading typeStyle="heading-xs" className="mt-5">
                {link.title}
              </Heading>
              <p className="text-sm text-center">{link.details}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-20 text-center">
        <Heading typeStyle="heading-lg">
          Join these AsyncAPI Ambassadors
        </Heading>
        <Heading
          typeStyle="body-sm"
          textColor="text-gray-700"
          className="text-slate-500 mt-5"
        >
          Learn, share the knowledge with community members
        </Heading>
        <div className="mt-20 grid grid-cols-2 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {ambassadors.map((ambassador, i) => (
            <div
              key={i}
              className="bg-gray-100 hover:bg-white hover:shadow-lg hover:shadow-slate-400 border border-l-0 hover:border-0 p-4 flex flex-col justify-center items-center"
            >
              <div className="w-[60px] p-1 rounded-full border border-gray-100">
                <img
                  src={ambassador.img}
                  alt={ambassador.name}
                  className="rounded-full"
                />
              </div>
              <div className="mt-2 flex flex-col items-center">
                <span className="font-bold text-sm">@{ambassador.name}</span>
                <span className="text-sm text-gray-600">
                  Alejandra Quatzelli
                </span>
              </div>
              <div className="mt-2">
                <span>
                  <TwitterSVG />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-20">
        <div className="w-[60%] justify-between items-center">
          <img src="/img/homepage/reach.jpeg" />
        </div>
        <div className="mt-20 w-[50%]">
          <Heading typeStyle="heading-lg">Tokens of our appreciation</Heading>
          <Heading
            typeStyle="body-sm"
            textColor="text-gray-700"
            className="text-slate-500 mt-5"
          >
            We appreciate and value your commitment and passion to share your
            knowledge with your communities and we would like to support you in
            doing so.
          </Heading>
          <div className="mt-10">
            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-2">
              {tokens.map((token) => (
                <li
                  key={token}
                  className="bg-white p-2 shadow-lg rounded-lg flex items-center"
                >
                  <div>
                    <div className="bg-pink-200 rounded-full w-[30px] h-[30px] flex flex-col items-center justify-center">
                      <span className="text-sm">😍</span>
                    </div>
                  </div>
                  <div className="ml-[10px]">
                    <Heading typeStyle="heading-xs">{token.title}</Heading>
                    <p className="text-xs mt-[5px] text-slate-600">{token.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Button
            className="block md:inline-block focus:outline-none mt-10 text-center sm:text-left"
            text="Become an Ambassador now"
            href="https://github.com/orgs/asyncapi/discussions"
            target="_blank"
          />
        </div>
      </div>
    </GenericLayout>
  );
}

export default Index;
