import { sortBy } from 'lodash';
import Link from 'next/link';
import React from 'react';

import type { Ambassador } from '@/types/pages/community/Community';
import { HeadingTypeStyle } from '@/types/typography/Heading';

import Button from '../../../components/buttons/Button';
import GenericLayout from '../../../components/layout/GenericLayout';
import NewsletterSubscribe from '../../../components/NewsletterSubscribe';
import Heading from '../../../components/typography/Heading';
import ambassadorList from '../../../config/ambassador_lists.json';
import ambassadors from '../../../config/AMBASSADORS_MEMBERS.json';

/**
 * @description Add additional user information to the user object having ambassador data
 * @param {Ambassador} user - The user object having ambassador data
 */
export function addAdditionalUserInfo(user: Ambassador) {
  const userData: Ambassador = {
    ...user
  };

  // add social links
  if (userData.github) {
    userData.githubUrl = `https://www.github.com/${userData.github}`;
  }
  if (userData.linkedin) {
    userData.linkedinUrl = `https://www.linkedin.com/in/${userData.linkedin}`;
  }
  if (userData.twitter) {
    userData.twitterUrl = `https://www.twitter.com/${userData.twitter}`;
  }

  // add img url
  // github redirects to avatar url using `https://www.github.com/<username>.png`
  userData.img = `${userData.githubUrl}.png`;

  return userData;
}

/**
 * @description The main page for the AsyncAPI Ambassador Program.
 */
export default function Index() {
  const image = '/img/social/community-ambassadors.webp';
  const asyncapiAmbassadors = sortBy(
    ambassadors.map((user) => addAdditionalUserInfo(user)),
    ['name']
  );

  return (
    <GenericLayout title='AsyncAPI Ambassador Program' description='The AsyncAPI Ambassador Program' image={image} wide>
      <div className='flex flex-col items-center justify-between lg:flex-row' data-testid='Ambassadors-main'>
        <div className='w-full text-center lg:w-[45%] lg:text-left' data-testid='Ambassadors-content'>
          <h1 className='mt-10  text-3xl font-semibold md:text-4xl lg:text-5xl' data-testid='Ambassadors-title'>
            Teachers. Champions. <span className='countdown-text-gradient'>Ambassadors!</span>
          </h1>
          <Heading typeStyle={HeadingTypeStyle.bodyLg} textColor='text-gray-700' className='mt-5 text-slate-500'>
            Passionate about event-driven architectures or message-driven APIs? Become an AsyncAPI Ambassador and help
            the OSS community build the future of APIs.
          </Heading>
          <div data-testid='Ambassadors-button'>
            <Button
              className='mt-10 block text-center focus:outline-none md:inline-block'
              text='Become an AsyncAPI Ambassador'
              href='https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/AMBASSADOR_PROGRAM.md'
              target='_blank'
            />
          </div>
        </div>
        <div className='hidden w-1/2 lg:block'>
          <img src='/img/homepage/ambassador-cover.svg' alt='ambassador-cover' className='w-full' />
        </div>
      </div>
      <div className='mt-20'>
        <div className='aspect-h-9 aspect-w-16 bg-center'>
          <iframe
            src='https://www.youtube.com/embed/3rg_7hIb9PQ'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            data-testid='Ambassadors-Iframe'
          ></iframe>
        </div>
        <div className='flex justify-center'>
          <div className='mt-10 text-center lg:w-[55%]' data-testid='Ambassadors-contributions'>
            <Heading typeStyle={HeadingTypeStyle.lg}>AsyncAPI Ambassador Contributions</Heading>
            <Heading typeStyle={HeadingTypeStyle.bodyLg} textColor='text-gray-700' className='mt-5 text-slate-500'>
              AsyncAPI Ambassadors are passionate about APIs and AsyncAPI. They share their interest, expertise, and
              excitement within their communities to help others build better software.
            </Heading>
          </div>
        </div>
        <ul className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {ambassadorList.contents.map((link) => (
            <li key={link.title} className='flex flex-col items-center justify-start' data-testid='Ambassadors-list'>
              <img src={link.icon} alt={link.title} className='mt-20 w-[200px]' />
              <Heading typeStyle={HeadingTypeStyle.xs} className='mt-5'>
                {link.title}
              </Heading>
              <p className='text-center text-sm'>{link.details}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-20 text-center'>
        <Heading typeStyle={HeadingTypeStyle.lg}>Join these AsyncAPI Ambassadors</Heading>
        <Heading typeStyle={HeadingTypeStyle.bodyLg} textColor='text-gray-700' className='mt-5 text-slate-500'>
          Learn and share knowledge with community members
        </Heading>
        <div
          className='mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'
          data-testid='Ambassadors-members-main'
        >
          {asyncapiAmbassadors.map((ambassador: Ambassador, index: number) => (
            <div
              key={index}
              className='mt-6 flex flex-col justify-between rounded-md border pb-2 text-left'
              data-testid='Ambassadors-members'
            >
              <div>
                <div className='flex justify-between p-2' data-testid='Ambassadors-members-details'>
                  <div>{ambassador.name}</div>
                  <div data-testid='Ambassadors-members-country'>{ambassador.country}</div>
                </div>
                <Link href={`ambassadors/${ambassador.github}`} as={`ambassadors/${ambassador.github}`}>
                  <div className='p-2'>
                    <div
                      className='h-auto w-full cursor-pointer rounded-md bg-center'
                      data-testid='Ambassadors-members-img'
                    >
                      <img
                        src={ambassador.img}
                        alt={ambassador.name}
                        className='h-auto w-full rounded-lg object-contain'
                      />
                    </div>
                    <div className='mt-2 w-full rounded-lg border p-2 text-sm'>{ambassador.title}</div>
                  </div>
                </Link>
              </div>
              <div className='flex h-full flex-col justify-between'>
                <div className='p-2 text-sm'>{ambassador.bio}</div>
                <div className='flex border-t p-2' data-testid='Ambassadors-members-socials'>
                  <a
                    href={ambassador.twitterUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='underline'
                    data-testid='Ambassadors-members-twitter'
                  >
                    Twitter ↗
                  </a>
                  <a href={ambassador.githubUrl} target='_blank' rel='noreferrer' className='ml-3 underline'>
                    Github ↗
                  </a>
                  <a href={ambassador.linkedinUrl} target='_blank' rel='noreferrer' className='ml-3 underline'>
                    Linkedin ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-20'>
        <div className='flex justify-center'>
          <div className='mt-10 text-center lg:w-[55%]' data-testid='Events-token'>
            <Heading typeStyle={HeadingTypeStyle.lg}>Tokens of our appreciation</Heading>
            <Heading typeStyle={HeadingTypeStyle.bodyLg} textColor='text-gray-700' className='mt-5 text-slate-500'>
              We appreciate your commitment and passion for sharing your knowledge with your communities. Let us support
              you!
            </Heading>
          </div>
        </div>
        <div className='mt-10'>
          <ul className='grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4'>
            {ambassadorList.tokens.map((token) => (
              <li key={token.title} className='mt-4 flex rounded-lg bg-white p-3 shadow-lg'>
                <div>
                  <div className='flex size-[30px] flex-col items-center justify-center rounded-full bg-pink-200'>
                    <span className='text-sm'>{token.emoji}</span>
                  </div>
                </div>
                <div className='ml-[10px]'>
                  <Heading typeStyle={HeadingTypeStyle.xs}>{token.title}</Heading>
                  <p className='mt-[5px] text-xs text-slate-600'>{token.details}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className='mt-20 h-auto w-full rounded-lg bg-dark bg-mapCover bg-cover bg-center p-4 bg-blend-soft-light'
          data-testid='Events-ambassadors'
        >
          <div className='flex justify-center'>
            <div className='p-4 text-center text-white lg:w-[65%]'>
              <Heading typeStyle={HeadingTypeStyle.lg}>Become an AsyncAPI Ambassador</Heading>
              <Heading typeStyle={HeadingTypeStyle.bodyLg}>
                The AsyncAPI Ambassador program is now open for applications! If you&apos;re selected, you&apos;ll join
                AsyncAPI&apos;s mission of helping community members all over the world, build the future of
                Event-Driven APIs.
              </Heading>
              <div className='md:item-center w-full md:flex md:justify-between'>
                <Button
                  className='mt-5 block text-center focus:outline-none md:mt-10 md:inline-block md:w-[48%]'
                  text='Become an Ambassador now'
                  href='https://github.com/asyncapi/community/blob/master/AMBASSADOR_ORGANIZATION.md#are-you-interested-in-becoming-an-official-asyncapi-ambassador'
                  target='_blank'
                />
                <Button
                  bgClassName='bg-transparent border border-primary-600 hover:bg-primary-400'
                  className='mt-5 block text-center focus:outline-none md:mt-10 md:inline-block md:w-[48%]'
                  text='Learn more'
                  href='https://www.asyncapi.com/blog/asyncapi-ambassador-program'
                  target='_blank'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsletterSubscribe className='mt-20 text-center' />
    </GenericLayout>
  );
}
