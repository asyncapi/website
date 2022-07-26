/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Heading from '../../components/typography/Heading';
import Button from '../../components/buttons/Button';
import CommunityLayout from '../../components/layout/CommunityLayout';

const orbit1 = [
  {
    id: 'item',
    img: '/img/homepage/reaction.png',
    alt: 'reaction',
  },
  {
    id: 'item',
    img: '/img/homepage/ale.jpeg',
    alt: 'ale',
  },
  {
    id: 'item',
    img: '/img/homepage/idea.png',
    alt: 'idea',
  },
  {
    id: 'item',
    img: '/img/homepage/lukasz-homepage-slack.jpg',
    alt: 'lukasz',
  },
  {
    id: 'item',
    img: '/img/homepage/comment.png',
    alt: 'comment',
  },
  {
    id: 'item',
    img: '/img/homepage/fran.png',
    alt: 'fran',
  },
];


const orbit2 = [
  {
    id: 'item-2',
    img: '/img/homepage/jonas.jpeg',
    alt: 'jonas',
  },
  {
    id: 'item-2',
    img: '/img/homepage/slack.png',
    alt: 'slack',
  },
  {
    id: 'item-2',
    img: '/img/homepage/missy.jpeg',
    alt: 'missy',
  },
  {
    id: 'item-2',
    img: '/img/homepage/check.png',
    alt: 'check',
  },
  {
    id: 'item-2',
    img: '/img/homepage/eve-and-chan.png',
    alt: 'eve-chan',
  },
  {
    id: 'item-2',
    img: '/img/homepage/maciej.png',
    alt: 'maciej',
  },
  {
    id: 'item-2',
    img: '/img/homepage/git.png',
    alt: 'git',
  },
];

const orbit3 = [
  {
    id: 'item-3',
    img: '/img/homepage/ace.jpeg',
    alt: 'ace',
  },
  {
    id: 'item-3',
    img: '/img/homepage/slack.png',
    alt: 'slack',
  },
  {
    id: 'item-3',
    img: '/img/homepage/barbano.jpeg',
    alt: 'barbano',
  },
  {
    id: 'item-3',
    img: '/img/homepage/dale.jpeg',
    alt: 'dale',
  },
  {
    id: 'item-3',
    img: '/img/homepage/kuda.jpeg',
    alt: 'kuda',
  },
  {
    id: 'item-3',
    img: '/img/homepage/maciej.png',
    alt: 'maciej',
  },
  {
    id: 'item-3',
    img: '/img/homepage/sergio.jpeg',
    alt: 'sergio',
  },
];

const quickLinks = [
  { title: 'Advocate Programs', bg: 'white', color: 'primary-600' },
  { title: 'Events & Meetups', bg: 'primary-600', color: 'white' },
  { title: 'Community Members', bg: 'white', color: 'primary-600' },
  { title: 'Start Contributing', bg: 'primary-600', color: 'white' },
];

function CommunityIndexPage() {
      const handleScroll = (event) => {
        console.log('scrollTop: ', event.currentTarget.scrollTop);
        console.log('offsetHeight: ', event.currentTarget.offsetHeight);
      };
  return (
    <CommunityLayout
      title="AsyncAPI Meetings"
      description="The home for developer communities"
      wide
      onScroll={handleScroll}
    >
      <div className="">
        <div className="orbit-container">
          <div id="first-orbit" className="orbit">
            {orbit1.map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} className="orbit-img" />
              </div>
            ))}
            <div className="w-full absolute h-full flex justify-center z-40">
              <div className="text-center flex justify-center flex-col items-center">
                <Heading
                  className="countdown-text-gradient font-bold"
                  level="h6"
                  typeStyle="heading-xs"
                >
                  AsyncAPI Community
                </Heading>
                <div className="mt-10">
                  <Heading level="h1" typeStyle="heading-xl">
                    <span className="title block md:-mt-1 leading-[3rem]">
                      The home <br /> for developer <br /> communities
                    </span>
                  </Heading>
                </div>
                <div className="mt-5 w-5/6">
                  <Heading
                    level="h2"
                    typeStyle="body-md"
                    textColor="text-gray-700"
                    className="text-slate-500 text-sm"
                  >
                    We're a community of great people who are passionate about
                    AsyncAPI. Join us in building the future of Event Driven
                    APIs by asking questions, share ideas and build connection
                    with each other
                  </Heading>
                </div>
                <div className="mt-10">
                  <Button
                    className="block md:inline-block"
                    text="Explore Discussions >"
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="second-orbit" className="orbit">
            {orbit2.map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} />
              </div>
            ))}
          </div>
          <div id="third-orbit" className="orbit">
            {orbit3.map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center relative h-screen z-40">
        <div className="gh-bg absolute">
          <img
            className="gh-img"
            src="/img/homepage/discuss-page.png"
            alt="github-discussion"
          />
        </div>
      </div>
      <div className="text-center flex justify-center flex-col items-center">
        <Heading level="h1" typeStyle="heading-xl" className="md:text-5xl z-40">
          Home of #CommunityOps
        </Heading>
        <div className="w-3/6 z-40">
          <Heading
            level="h2"
            typeStyle="body-lg"
            textColor="text-gray-700"
            className="text-slate-500 text-sm"
          >
            Decrease the burden of managing active work in issues and pull
            requests by providing a separate space to host ongoing discussions,
            questions, and ideas.
          </Heading>
        </div>
        <div className="mt-32 z-40">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <li
                key={link.title}
                className={`h-72 w-72 justify-between border border-primary-100 shadow-xl hover:shadow-lg transition-all duration-300 ease-in-out rounded-xl px-3 pb-5 bg-${link.bg} text-left flex justify-end items-end`}
              >
                <h1 className={`text-3xl font-black text-${link.color}`}>
                  {link.title}
                </h1>
              </li>
            ))}
          </ul>
        </div>
        <div className="z-40 mt-28 bg-white w-full h-130 rounded-lg shadow-xl flex justify-between">
          <div className="p-10 flex justify-between w-2/5 h-full flex-col text-left">
            <div>
              <Heading
                level="h2"
                typeStyle="heading-md"
                textColor="text-gray-200"
              >
                All community info, tracked
              </Heading>
            </div>
            <div>
              <Heading level="h2" typeStyle="heading-lg">
                Community Platform
              </Heading>
              <Heading
                level="h2"
                typeStyle="body-lg"
                textColor="text-gray-700"
                className="text-slate-500 text-sm mt-10"
              >
                A powerful and flexible tool for tracking community members
                information, resources, and activities. All of it is stored in
                real time, so that your team can access it and act on it.
              </Heading>
              <div className="mt-10"></div>
            </div>
          </div>
          <div className="w-3/6 flex justify-end">
            <img src="/img/homepage/slack-cover.png" alt="slack-cover" />
          </div>
        </div>
        <div className="community-pattern absolute"></div>
      </div>
    </CommunityLayout>
  );
}

export default CommunityIndexPage;