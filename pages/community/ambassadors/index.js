import React from 'react';
import { sortBy } from 'lodash';
import Button from '../../../components/buttons/Button';
import GenericLayout from '../../../components/layout/GenericLayout';
import Heading from '../../../components/typography/Heading';
import NewsletterSubscribe from '../../../components/NewsletterSubscribe';
import ambassadors from '../../../config/AMBASSADORS_MEMBERS.json';
import ambassadorList from '../../../config/ambassador_lists.json'
import Link from 'next/link';


export function addAdditionalUserInfo(user) {
  const userData = {
    ...user,
  };

  // add social links
  if (userData.github)
    userData.githubUrl = `https://www.github.com/${userData.github}`;
  if (userData.linkedin)
    userData.linkedinUrl = `https://www.linkedin.com/in/${userData.linkedin}`;
  if (userData.twitter)
    userData.twitterUrl = `https://www.twitter.com/${userData.twitter}`;

  // add img url
  // github redirects to avatar url using `https://www.github.com/<username>.png`
  userData.img = userData.githubUrl + '.png';

  return userData;
}

function Index() {
  const image = '/img/social/community-ambassadors.webp';
  const asyncapiAmbassadors = sortBy(
    ambassadors.map((user) => addAdditionalUserInfo(user)),
    ['name']
  );

  return (
    <GenericLayout
      title="AsyncAPI Ambassador Program"
      description="The AsyncAPI Ambassador Program"
      image={image}
      wide
    >
      <div className="flex flex-col lg:flex-row justify-between items-center" data-testid="Ambassadors-main">
        <div className="lg:w-[45%] w-full lg:text-left text-center" data-testid="Ambassadors-content">
          <h1 className="font-semibold  text-3xl lg:text-5xl md:text-4xl mt-10" data-testid="Ambassadors-title">
            Teachers. Champions.{' '}
            <span className="countdown-text-gradient">Ambassadors!</span>
          </h1>
          <Heading
            typeStyle="body-sm"
            textColor="text-gray-700"
            className="text-slate-500 mt-5"
          >
            Passionate about event-driven architectures or message-driven APIs?
            Become an AsyncAPI Ambassador and help the OSS community build the
            future of APIs.
          </Heading>
          <div data-testid="Ambassadors-button">
            <Button
              className="block md:inline-block focus:outline-none mt-10 text-center"
              text="Become an AsyncAPI Ambassador"
              href="https://github.com/asyncapi/community/blob/master/AMBASSADOR_ORGANIZATION.md#are-you-interested-in-becoming-an-official-asyncapi-ambassador"
              target="_blank"
            />
          </div>
        </div>
        <div className="w-[50%] lg:block hidden">
          <img
            src="/img/homepage/ambassador-cover.svg"
            alt="ambassador-cover"
            className="w-full"
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="aspect-w-16 aspect-h-9 bg-center">
          <iframe src="https://www.youtube.com/embed/3rg_7hIb9PQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          data-testid="Ambassadors-Iframe"></iframe>
        </div>
        <div className="flex justify-center">
          <div className="text-center mt-10 lg:w-[55%]" data-testid="Ambassadors-contributions">
            <Heading typeStyle="heading-lg">
              AsyncAPI Ambassador Contributions
            </Heading>
            <Heading
              typeStyle="body-sm"
              textColor="text-gray-700"
              className="text-slate-500 mt-5"
            >
              AsyncAPI Ambassadors are passionate about APIs and AsyncAPI. They
              share their interest, expertise, and excitement within their
              communities to help others build better software.
            </Heading>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ambassadorList.contents.map((link) => (
            <li
              key={link.title}
              className="flex flex-col justify-center items-center"
              data-testid="Ambassadors-list"
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
          Learn and share knowledge with community members
        </Heading>
        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" data-testid="Ambassadors-members-main">
          {asyncapiAmbassadors.map((ambassador, i) => (
            <div
              key={i}
              className="rounded-md border flex flex-col justify-between text-left mt-6 pb-2"
              data-testid="Ambassadors-members"
          >
              <div>
                <div className="flex justify-between p-2" data-testid="Ambassadors-members-details">
                  <div>{ambassador.name}</div>
                  <div data-testid="Ambassadors-members-country" >{ambassador.country}</div>
                </div>
                <Link
                  href={`ambassadors/${ambassador.github}`}
                  as={`ambassadors/${ambassador.github}`}
                >
                  <div className="p-2">
                    <div className="w-full h-auto bg-center rounded-md cursor-pointer" data-testid="Ambassadors-members-img">
                      <img
                        src={ambassador.img}
                        alt={ambassador.name}
                        className="h-auto w-full rounded-lg object-contain"
                      />
                    </div>
                    <div className="mt-2 w-full rounded-lg border p-2 text-sm">
                      {ambassador.title}
                    </div>
                  </div>
                </Link>
              </div>
              <div>
                <div className="p-2 text-sm">{ambassador.bio}</div>
                <div className="border-t p-2 flex" data-testid="Ambassadors-members-socials">
                  <a
                    href={ambassador.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                    data-testid="Ambassadors-members-twitter"
                  >
                    Twitter ↗
                  </a>
                  <a
                    href={ambassador.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline ml-3"
                  >
                    Github ↗
                  </a>
                  <a
                    href={ambassador.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline ml-3"
                  >
                    Linkedin ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20">
        <div className="flex justify-center">
          <div className="text-center mt-10 lg:w-[55%]" data-testid="Events-token">
            <Heading typeStyle="heading-lg">Tokens of our appreciation</Heading>
            <Heading
              typeStyle="body-sm"
              textColor="text-gray-700"
              className="text-slate-500 mt-5"
            >
              We appreciate your commitment and passion for sharing your
              knowledge with your communities. Let us support you!
            </Heading>
          </div>
        </div>
        <div className="mt-10">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {ambassadorList.tokens.map((token) => (
              <li
                key={token}
                className="mt-4 bg-white p-3 shadow-lg rounded-lg flex"
              >
                <div>
                  <div className="bg-pink-200 rounded-full w-[30px] h-[30px] flex flex-col items-center justify-center">
                    <span className="text-sm">{token.emoji}</span>
                  </div>
                </div>
                <div className="ml-[10px]">
                  <Heading typeStyle="heading-xs">{token.title}</Heading>
                  <p className="text-xs mt-[5px] text-slate-600">
                    {token.details}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-mapCover bg-dark bg-blend-soft-light bg-center bg-cover w-full h-auto p-4 mt-20 rounded-lg" data-testid="Events-ambassadors">
          <div className="flex justify-center">
            <div className="text-center p-4 text-white lg:w-[65%]">
              <Heading typeStyle="heading-lg">
                Become an AsyncAPI Ambassador
              </Heading>
              <Heading typeStyle="body-sm">
                The AsyncAPI Ambassador program is now open for applications! If
                you’re selected, you’ll join AsyncAPI's mission of helping
                community members all over the world, build the future of
                Event-Driven APIs.
              </Heading>
              <div className="flex item-center w-full justify-between">
              <Button
                className="block md:inline-block focus:outline-none mt-10 text-center w-[48%]"
                text="Become an Ambassador now"
                href="https://github.com/asyncapi/community/blob/master/AMBASSADOR_ORGANIZATION.md#are-you-interested-in-becoming-an-official-asyncapi-ambassador"
                target="_blank"
              />
              <Button
                bgClassName="bg-transparent border border-primary-600 hover:bg-primary-400"
                className="block md:inline-block focus:outline-none mt-10 text-center w-[48%]"
                text="Learn more"
                href="https://www.asyncapi.com/blog/asyncapi-ambassador-program"
                target="_blank"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsletterSubscribe className="mt-20 text-center" />
    </GenericLayout>
  );
}

export default Index;
