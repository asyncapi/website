import React from 'react';

import type { Ambassador } from '@/types/pages/community/Community';
import { HeadingTypeStyle } from '@/types/typography/Heading';

import IconGithub from '../../../components/icons/Github';
import IconLinkedIn from '../../../components/icons/LinkedIn';
import IconTwitter from '../../../components/icons/Twitter';
import GenericLayout from '../../../components/layout/GenericLayout';
import Heading from '../../../components/typography/Heading';
import ambassadors from '../../../config/AMBASSADORS_MEMBERS.json';

interface IndexProps {
  contributor: Ambassador;
}

/**
 * @description This function gets the props for the static site generation.
 *
 * @param {params} params - The params of the page.
 * @returns {Promise<{ props: { contributor: Ambassador } }>} An object containing the props of the page.
 */
export async function getStaticProps({
  params
}: {
  params: { id: string };
}): Promise<{ props: { contributor: Ambassador } }> {
  const data = ambassadors.filter((p) => p.github === params.id);

  return {
    props: {
      contributor: data[0]
    }
  };
}

/**
 * @description This function gets the paths for the static site generation.
 *
 * @returns {Promise<{ paths: { params: { id: string } }[], fallback: boolean }>} An object containing an array of paths and a fallback boolean.
 */
export async function getStaticPaths(): Promise<{ paths: { params: { id: string } }[]; fallback: boolean }> {
  const paths = ambassadors.map((user) => ({
    params: { id: user.github }
  }));

  return {
    paths,
    fallback: false
  };
}

/**
 * @description This is the page about the ambassador.
 *
 * @param {props} props - The props of the page.
 * @param {Ambassador} props.contributor - The ambassador data.
 */
export default function Index({ contributor }: IndexProps) {
  const image = '/img/social/website-card.png';

  return (
    <GenericLayout
      title='AsyncAPI Ambassador Program'
      description='The home for developer communities'
      image={image}
      hideBanner={true}
      wide
    >
      <div className='mt-10 flex flex-col items-center justify-between md:mt-20 md:flex-row'>
        <div className='w-full md:w-[65%]'>
          <Heading typeStyle={HeadingTypeStyle.xl} className='countdown-text-gradient'>
            {contributor.name}
          </Heading>
          <div className='mt-4 flex items-center'>
            <span className='ml-2 font-bold'>{contributor.country}</span>
          </div>
          <div className='mt-10'>
            <Heading typeStyle={HeadingTypeStyle.bodyLg}>{contributor.bio}</Heading>
          </div>
          <div className='mt-10 flex items-center'>
            <a
              href={`https://www.twitter.com/${contributor.twitter}`}
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              <div className='w-[40px] rounded-full bg-pink-500 p-2'>
                <IconTwitter className='fill-white' />
              </div>
            </a>
            <a
              href={`https://www.github.com/${contributor.github}`}
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              <div className='ml-4 w-[40px] rounded-full bg-pink-500 p-2'>
                <IconGithub className='fill-white' />
              </div>
            </a>
            <a
              href={`https://www.linkedin.com/in/${contributor.linkedin}`}
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              <div className='ml-4 w-[40px] rounded-full bg-pink-500 p-2'>
                <IconLinkedIn className='fill-white' />
              </div>
            </a>
          </div>
        </div>
        <div className='mt-10 md:mt-0'>
          <img src={contributor.img} alt={contributor.name} className='w-[350px] rounded-lg' />
        </div>
      </div>
      <div className='c-contributor-line mt-20 h-px' />
      <Heading typeStyle={HeadingTypeStyle.lg} className='mt-8'>
        Contributions
      </Heading>
      <div className='mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3'>
        {contributor.contributions.map((contribution) => {
          return (
            <div
              key={contribution.title}
              className='mt-5 rounded-lg border p-5 text-gray-600 hover:border-primary-600 hover:text-pink-600'
            >
              <a key={contribution.title} href={contribution.link} target='_blank' rel='noreferrer'>
                <div className='flex h-full flex-col justify-between'>
                  <Heading typeStyle={HeadingTypeStyle.bodyLg}>{contribution.title}</Heading>
                  <div className='mt-4 flex justify-between'>
                    <div> {contribution.type}</div>{' '}
                    <div>
                      {contribution.date.month}-{contribution.date.year}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </GenericLayout>
  );
}
