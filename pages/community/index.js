/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Heading from '../../components/typography/Heading';
import Button from '../../components/buttons/Button';
import CommunityLayout from '../../components/layout/CommunityLayout';
import IconRocket from '../../components/icons/Rocket';

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
    img: '/img/homepage/star.png',
    alt: 'star',
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
    img: '/img/homepage/yash.jpeg',
    alt: 'yash',
  },
  {
    id: 'item-3',
    img: '/img/homepage/sergio.jpeg',
    alt: 'sergio',
  },
];

const quickLinks = [
  { title: 'Advocate Programs', bg: 'white', color: 'primary-600' },
  { title: 'Events & Meetups', bg: 'white', color: 'primary-600' },
  { title: 'Community Members', bg: 'white', color: 'primary-600' },
  { title: 'Start Contributing', bg: 'white', color: 'primary-600' },
];

function CommunityIndexPage() {
  return (
    <CommunityLayout
      title="AsyncAPI Meetings"
      description="The home for developer communities"
      wide
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
                    text="Explore Discussions"
                    icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
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
      <div className="text-center relative h-half-screen z-40">
        <div className="gh-bg absolute">
          <img
            className="gh-img"
            src="/img/homepage/discuss-page.png"
            alt="github-discussion"
          />
        </div>
      </div>
      <div className="text-center flex justify-center flex-col items-center md:mt-72">
        <Heading level="h1" typeStyle="heading-xl" className="text- z-40">
          Home of #CommunityOps
        </Heading>
        <div className="w-3/6 z-40">
          <Heading
            level="h2"
            typeStyle="body-lg"
            textColor="text-gray-700"
            className="text-slate-500 text-sm"
          >
            Join the conversation with over 10k+ developers from literally
            everywhere.
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
                AsyncAPI’s incredible community of developers, designers,
                technical writers, hail from over 83 countries, actively
                contributing, collaborating and mentoring others to build with
                AsyncAPI.
              </Heading>
              <div className="mt-10"></div>
            </div>
          </div>
          <div className="w-3/6 flex justify-end bg-channelCover bg-left bg-cover"></div>
        </div>

        <div className="z-40 mt-10 w-full h-130 shadow-xl flex justify-between">
          <div className="p-10 bg-primary-500 rounded-l-lg flex justify-between w-3/5 h-full flex-col text-left">
            <div className="">
              <Heading
                level="h2"
                typeStyle="heading-md"
                textColor="text-gray-400"
              >
                Community heartbeat
              </Heading>
            </div>
            <div>
              <Heading level="h2" typeStyle="heading-lg" textColor="text-white">
                Events & Meetups
              </Heading>
              <Heading
                level="h2"
                typeStyle="body-lg"
                textColor="text-white"
                className="text-slate-500 text-sm mt-10"
              >
                Join a AsyncAPI event, from anywhere in the world. <br />
                 Learn more about our live and recorded events below. <br />
                  You can also sign up to our community newsletter to <br /> stay up-to-date on our events.
              </Heading>
              <div className="mt-10"></div>
            </div>
          </div>
          <div className="w-3/5 flex relative justify-end  bg-eventCover bg-cover bg-center">
            <div className="bg-primary-500 w-full h-full opacity-25 rounded-r-lg" />
            <div className="absolute h-full w-full flex flex-col justify-center items-end item-right">
              <div className="w-4/5">
                <div className="bg-white w-full p-4 rounded-l-md">
                  <div className="flex">
                    <div className="w-40 bg-pink-400 p-4 rounded-md text-sm font-semibold text-white">
                      Conference 2022
                    </div>
                    <div className="ml-4 text-left">
                      <h1 className="text-xl">AsyncAPI Conference</h1>
                      <span className="text-gray-500 text-sm">
                        3rd Nov, 2022 - 5th Nov, 2022
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-full bg-gray-200 mt-4"
                    style={{ height: '1px' }}
                  />
                  <div className="flex mt-2 justify-between">
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-2xl">91</h1>
                      <div className="text-gray-500 text-sm">
                        Days until <br /> event
                      </div>
                    </div>
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-2xl">40</h1>
                      <div className="text-gray-500 text-sm">
                        Talks
                        <br /> submitted
                      </div>
                    </div>
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-2xl">1.4k</h1>
                      <div className="text-gray-500 text-sm">
                        Attendees
                        <br /> registered
                      </div>
                    </div>
                    <div className="text-left">
                      <h1 className="text-2xl">91</h1>
                      <div className="text-gray-500 text-sm">
                        Days until <br /> event
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white w-full p-4 mt-10 rounded-l-md">
                  <div className="flex">
                    <div className="w-40 bg-secondary-500 p-4 rounded-md text-sm font-semibold text-white">
                      Spec 3.0 👋
                    </div>
                    <div className="ml-4 text-left">
                      <h1 className="text-xl">Spec 3.0 Meeting</h1>
                      <span className="text-gray-500 text-sm">
                        3rd Nov, 2022 - 5th Nov, 2022
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-full bg-gray-200 mt-4"
                    style={{ height: '1px' }}
                  />
                  <div className="flex mt-2 justify-between">
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-2xl">91</h1>
                      <div className="text-gray-500 text-sm">
                        Days until <br /> event
                      </div>
                    </div>
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-2xl">40</h1>
                      <div className="text-gray-500 text-sm">
                        Talks
                        <br /> submitted
                      </div>
                    </div>
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-2xl">1.4k</h1>
                      <div className="text-gray-500 text-sm">
                        Attendees
                        <br /> registered
                      </div>
                    </div>
                    <div className="text-left">
                      <h1 className="text-2xl">91</h1>
                      <div className="text-gray-500 text-sm">
                        Days until <br /> event
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="community-pattern absolute"></div>
        <div className="z-40 mt-10 bg-white w-full h-130 rounded-lg shadow-xl flex justify-between">
          <div className="p-10 flex justify-between w-2/5 h-full flex-col text-left">
            <div>
              <Heading
                level="h2"
                typeStyle="heading-md"
                textColor="text-gray-200"
              >
                Support your rockstars
              </Heading>
            </div>
            <div>
              <Heading level="h2" typeStyle="heading-lg">
                Advocate Programs
              </Heading>
              <Heading
                level="h2"
                typeStyle="body-lg"
                textColor="text-gray-700"
                className="text-slate-500 text-sm mt-10"
              >
                Launch community advocate programs that your members are proud
                to be a part of. Powerful ambassador engagement analytics make
                it easy to track and reward you contributors and build thriving
                communities.
              </Heading>
              <div className="mt-10"></div>
            </div>
          </div>
          <div className="w-3/6 flex justify-end rounded-lg">
            <img
              src="/img/homepage/ambassador.jpeg"
              alt="slack-cover"
              className="rounded-r-lg"
            />
          </div>
        </div>
        <div className="mt-10 flex justify-between w-full h-130">
          <div className="w-3/4 mr-5 rounded-lg relative shadow-xl bg-tutorialCover bg-cover h-full bg-center">
            <div className="w-full h-full bg-primary-500 opacity-25 absolute rounded-lg" />
            <div className="w-full h-full flex flex-col justify-end absolute">
              <div className="bg-primary-400 text-left rounded-b-lg p-5 ">
                <Heading
                  level="h2"
                  typeStyle="heading-lg"
                  className="text-white"
                >
                  Browse our Tutorials
                </Heading>
                <Heading
                  level="h2"
                  typeStyle="body-lg"
                  textColor="text-gray-900"
                  className="text-slate-500 text-sm"
                >
                  We have thousands of tutorials covering a wide range of
                  topics. Jump into our catalog!
                </Heading>
              </div>
            </div>
          </div>
          <div className="w-2/4 flex flex-col justify-around">
            <div className="h-beforeHalf rounded-lg shadow-lg bg-usecases bg-cover bg-center relative">
              <div className="w-full h-full bg-pink-500 opacity-25 absolute rounded-lg" />
              <div className="w-full h-full flex flex-col justify-end absolute">
                <div className="bg-pink-300 text-left rounded-b-lg p-5 ">
                  <Heading
                    level="h2"
                    typeStyle="heading-md"
                    className="text-white"
                  >
                    Explore our Use-cases
                  </Heading>
                  <Heading
                    level="h2"
                    typeStyle="body-md"
                    textColor="text-gray-900"
                    className="text-slate-500 text-sm"
                  >
                    We have thousands of tutorials covering a wide range of
                    topics. Jump into our catalog!
                  </Heading>
                </div>
              </div>
            </div>
            <div className="h-beforeHalf mt-5 rounded-lg shadow-lg bg-roadmapCover bg-cover h-full bg-center relative">
              <div className="w-full h-full bg-secondary-500 opacity-25 absolute rounded-lg" />
              <div className="w-full h-full flex flex-col justify-end absolute">
                <div className="bg-secondary-300 text-left rounded-b-lg p-5 ">
                  <Heading
                    level="h2"
                    typeStyle="heading-md"
                    className="text-white"
                  >
                    Look into our Roadmap
                  </Heading>
                  <Heading
                    level="h2"
                    typeStyle="body-md"
                    textColor="text-gray-900"
                    className="text-slate-500 text-sm"
                  >
                    We have thousands of tutorials covering a wide range of
                    topics. Jump into our catalog!
                  </Heading>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-36 flex justify-center">
        <div className="p-5 w-3/5 text-center flex justify-center flex-col items-center">
          <Heading
            level="h1"
            typeStyle="heading-sm"
            className="md:text-5xl z-40"
          >
            Stay up to date!
          </Heading>
          <div className="flex border-2 rounded-lg mt-10 w-9/12 p-2">
            <input
              className="border-none bg-transparent w-10/12 focus:outline-none"
              placeholder="Enter email"
              type="email"
            />{' '}
            <Button className="block md:inline-block" text="Subscribe" />
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}

export default CommunityIndexPage;
