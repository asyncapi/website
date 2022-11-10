/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Heading from '../../components/typography/Heading';
import Button from '../../components/buttons/Button';
import IconRocket from '../../components/icons/Rocket';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
import GenericLayout from '../../components/layout/GenericLayout';

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

function CommunityIndexPage() {
  const image = '/img/social/website-card.png';
  const heading = (
    <div className="text-center flex justify-center flex-col items-center mt-10 md:mt-0">
      <Heading
        className="countdown-text-gradient font-bold"
        level="h6"
        typeStyle="heading-xs"
      >
        AsyncAPI Community
      </Heading>
      <div className="mt-10">
        <Heading level="h1" typeStyle="heading-xl" className="">
          <span className="title block md:-mt-1 leading-[3rem]">
            Welcome to <br /> the Community
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
          We are a community of great people who are passionate about AsyncAPI.
          Join us in building the future of Event Driven APIs by asking
          questions, share ideas and build connection with each other
        </Heading>
      </div>
      <div className="mt-10">
        <Button
          className="block md:inline-block focus:outline-none"
          text="Explore Discussions"
          href="https://github.com/orgs/asyncapi/discussions"
          target="_blank"
          icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
        />
      </div>
    </div>
  );
  return (
    <GenericLayout
      title="AsyncAPI Community"
      description="The home for developer communities"
      image={image}
      hideBanner={true}
      wide
    >
      <div className="md:hidden mt-15">{heading}</div>
      <div className="overflow-hidden orbits">
        <div className="orbit-container">
          <div id="first-orbit" className="orbit">
            {orbit1.map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} className="orbit-img" />
              </div>
            ))}
            <div className="w-full absolute h-full flex justify-center z-40">
              {heading}
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
      <div className="gh-img mt-10 md:mt-0 w-full h-auto w-full object-contain">
        <img
          className="gh-img object-contain"
          src="/img/homepage/discuss-page.png"
          alt="github-discussion"
        />
      </div>
      <div className="text-center flex justify-center flex-col items-center mt-[10rem]">
        <Heading level="h1" typeStyle="heading-xl" className="z-40">
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
        <div className="z-40 mt-10 bg-white w-full md:h-130 rounded-lg shadow-xl md:flex md:justify-between">
          <div className="p-10 flex justify-between w-full md:w-2/5 h-auto flex-col text-center md:text-left">
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
              <Heading level="h2" typeStyle="heading-lg" className="mt-10">
                Ambassador Programs
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
              <div className="mt-10">
                <Button
                  text="Become an ambassador"
                  buttonSize="medium"
                  href="/community/ambassador-program"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-fit-content md:w-3/6 flex justify-end rounded-lg">
            <img
              src="/img/homepage/ambassador.jpeg"
              alt="slack-cover"
              className="md:rounded-r-lg object-fit "
            />
          </div>
        </div>
        <div className="z-40 mt-10 w-full md:h-130 shadow-xl md:flex md:justify-between">
          <div className="p-10 bg-primary-500 rounded-t-lg md:rounded-t-none md:rounded-l-lg md:flex justify-between w-full md:w-3/5 md:h-full md:flex-col text-center md:text-left">
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
              <Heading
                level="h2"
                typeStyle="heading-lg"
                textColor="text-white"
                className="mt-10 md:mt-0"
              >
                Meetings & Events
              </Heading>
              <Heading
                level="h2"
                typeStyle="body-lg"
                textColor="text-white"
                className="text-sm mt-10"
              >
                Join a AsyncAPI event, from anywhere in the world. Learn more
                about our live and recorded events below. You can also sign up
                to our community newsletter to stay up-to-date on our events.
              </Heading>
              <div className="mt-10">
                <Button
                  text="Explore more events"
                  buttonSize="medium"
                  href="/community/events"
                  bgClassName="bg-secondary-500 hover:bg-secondary-400"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:h-full md:w-3/5 flex relative justify-end  bg-eventCover bg-cover bg-center">
            <div className="bg-primary-500 w-full opacity-25 rounded-b-lg md:rounded-b-none md:rounded-r-lg" />
            <div className="absolute h-full w-full flex flex-col md:justify-center items-end item-right">
              <div className="w-4/5 mt-10">
                <div className="bg-white w-full p-2 md:p-4 rounded-l-md">
                  <div className="flex">
                    <div className="flex justify-center flex-col w-24 md:w-40 bg-pink-400 p-1 md:p-4 rounded-md text-xs md:text-sm font-semibold text-white">
                      <span>Conference</span>
                    </div>
                    <div className="ml-4 text-left">
                      <h1 className="text-md md:text-xl">
                        AsyncAPI Conference
                      </h1>
                      <span className="text-gray-500 text-xs md:text-sm">
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
                      <h1 className="text-sm md:text-2xl">91</h1>
                      <div className="text-gray-500 text-xs md:text-sm">
                        Days left
                      </div>
                    </div>
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-sm md:text-2xl">40</h1>
                      <div className="text-gray-500 text-xs md:text-sm">
                        Talks
                      </div>
                    </div>
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-sm md:text-2xl">1.4k</h1>
                      <div className="text-gray-500 text-xs md:text-sm">
                        Attendees
                      </div>
                    </div>
                    <div className="text-left">
                      <h1 className="text-sm md:text-2xl">91</h1>
                      <div className="text-gray-500 text-xs md:text-sm">
                        Days left
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white mt-10 w-full p-2 md:p-4 rounded-l-md">
                  <div className="flex">
                    <div className="flex w-24 md:w-40 justify-center flex-col w-24 md:w-40 bg-secondary-500 p-1 md:p-4 rounded-md text-xs md:text-sm font-semibold text-white">
                      <span>Spec 3.0</span>
                    </div>
                    <div className="ml-4 text-left">
                      <h1 className="text-md md:text-xl">Spec 3.0</h1>
                      <span className="text-gray-500 text-xs md:text-sm">
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
                      <h1 className="text-sm md:text-2xl">91</h1>
                      <div className="text-gray-500 text-xs md:text-sm">
                        Days left
                      </div>
                    </div>
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-sm md:text-2xl">40</h1>
                      <div className="text-gray-500 text-xs md:text-sm">
                        Talks
                      </div>
                    </div>
                    <div className="text-left border-r-2 border-r-gray-400 pr-5">
                      <h1 className="text-sm md:text-2xl">1.4k</h1>
                      <div className="text-gray-500 text-xs md:text-sm">
                        Attendees
                      </div>
                    </div>
                    <div className="text-left">
                      <h1 className="text-sm md:text-2xl">91</h1>
                      <div className="text-gray-500 text-xs md:text-sm">
                        Days left
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="community-pattern absolute"></div>
        <div className="z-40 mt-10 bg-white w-full md:h-130 rounded-lg shadow-xl md:flex md:justify-between">
          <div className="p-10 md:flex justify-between md:w-2/5 md:h-full flex-col text-center md:text-left">
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
              <Heading
                level="h2"
                typeStyle="heading-lg"
                className="mt-10 md:mt-0"
              >
                AsyncAPI Slack
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
              <div className="mt-10">
                <Button
                  text="Join us on slack"
                  buttonSize="medium"
                  href="https://asyncapi.com/slack-invite"
                  target="_blank"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-half-screen md:h-full md:w-3/6 md:flex md:justify-end bg-channelCover md:bg-left bg-cover"></div>
        </div>
        <div className="mt-10 md:flex justify-between w-full h-half-screen">
          <div className="h-full rounded-lg shadow-lg bg-roadmapCover bg-cover bg-center relative md:w-[49%]">
            <a
              href="https://github.com/asyncapi/community/discussions/513"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-full h-full absolute rounded-lg" />
              <div className="w-full h-full flex flex-col justify-end absolute">
                <div className="bg-primary-600 text-left rounded-b-lg p-5 ">
                  <Heading
                    level="h2"
                    typeStyle="heading-md"
                    className="text-white"
                  >
                    Community Goals 2023
                  </Heading>
                  <Heading
                    level="h2"
                    typeStyle="body-md"
                    textColor="text-white"
                    className="text-sm"
                  >
                    Look into the AsyncAPI community building/maintenance goals
                    for 2023
                  </Heading>
                </div>
              </div>
            </a>
          </div>
          <div className="h-full rounded-lg shadow-lg bg-usecases bg-cover bg-center mt-10 relative md:w-[49%] md:mt-0">
            <div className="absolute bg-white p-2">
              <div className="countdown-text-gradient font-bold text-xl">
                coming soon
              </div>
            </div>
            <div className="w-full h-full absolute rounded-lg" />
            <div className="w-full h-full flex flex-col justify-end absolute">
              <div className="bg-pink-600 text-left rounded-b-lg p-5 ">
                <Heading
                  level="h2"
                  typeStyle="heading-md"
                  className="text-white"
                >
                  Explore Use-cases
                </Heading>
                <Heading
                  level="h2"
                  typeStyle="body-md"
                  textColor="text-white"
                  className="text-sm"
                >
                  See how AsyncAPI helps transform businesses
                </Heading>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark py-12 mt-8 mt-[35rem] md:mt-20 rounded-lg">
          <NewsletterSubscribe dark />
        </div>
      </div>
    </GenericLayout>
  );
}

export default CommunityIndexPage;
