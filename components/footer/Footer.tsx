import Link from 'next/link';
import React from 'react';

import { HeadingTypeStyle } from '@/types/typography/Heading';

import AsyncAPILogoLight from '../logos/AsyncAPILogoLight';
import Heading from '../typography/Heading';
import type { InitiativeLink, SocialMediaLink } from './FooterList';
import { initiativeLinks, socialMediaLinks } from './FooterList';

/**
 * @description The Footer component is the footer for the application.
 */
export default function Footer() {
  return (
    <footer className='margin: 0 auto mt-12 bg-dark'>
      <div className='mx-auto max-w-screen-xl divide-y divide-cool-gray overflow-hidden px-3 py-4 sm:p-6 md:py-12 lg:px-8 xl:py-16'>
        <nav className='flex flex-wrap justify-between py-4 sm:py-10'>
          <div className='mr-14 w-full md:w-auto'>
            <div className=''>
              <Link href='/' aria-label='AsyncAPI'>
                <span className='cursor-pointer' data-testid='Footer-logo-link'>
                  <AsyncAPILogoLight className='mt-3 h-10 w-auto' />
                </span>
              </Link>
            </div>
            <div className=''>
              <Heading className='mb-14 mt-12 text-white' typeStyle={HeadingTypeStyle.smSemibold}>
                Building the future of <br /> Event-Driven Architectures.
              </Heading>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row'>
            <div className='flex'>
              <div className='mb-5 px-0 lg:ml-5 lg:px-10'>
                <div className='py-2'>
                  <div className='text-white'>
                    <Heading typeStyle={HeadingTypeStyle.smSemibold}>The Initiative</Heading>
                  </div>
                </div>
                <ul className='justify-center'>
                  {initiativeLinks.map((link: InitiativeLink, index: number) => (
                    <li className='py-2' key={index} data-testid='Footer-initiative-links'>
                      <Link href={link.url}>
                        <span className='text-base leading-6 text-cool-gray transition duration-300 ease-in-out hover:text-white'>
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mb-5 px-14 sm:ml-10 sm:px-8 md:ml-5'>
                <div className='py-2'>
                  <div className='text-white'>
                    <Heading typeStyle={HeadingTypeStyle.smSemibold}>News</Heading>
                  </div>
                </div>
                <ul className='justify-center'>
                  <li className='py-2'>
                    <div className='text-base leading-6 text-cool-gray transition duration-300 ease-in-out hover:text-white'>
                      <a href='mailto:press@asyncapi.io'>Email Us</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className='mb-5 px-0 sm:ml-5 sm:px-10'>
              <div className='hidden py-2 sm:block'>
                <div className='mr-12 text-white'>
                  <Heading typeStyle={HeadingTypeStyle.smSemibold}>Social</Heading>
                </div>
              </div>
              <ul className='flex justify-start sm:flex-col' aria-label='AsyncAPI social media links'>
                {socialMediaLinks.map((link: SocialMediaLink, index: number) => (
                  <li className='mr-3 py-2 sm:mr-0' key={index} data-testid='Footer-social-media-links'>
                    <a href={link.url} target='_blank' rel='noopener noreferrer'>
                      <div className='flex items-center text-cool-gray transition duration-300 ease-in-out hover:text-white'>
                        <span className='sr-only'>{`Follow AsyncAPI on ${link.label}`}</span>
                        {link.icon}
                        <span className='absolute hidden pl-8 pr-5 sm:block'>{link.label}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className='justify-between py-8 sm:flex sm:py-12 xl:mt-20' data-testid='Footer-content'>
          <div className='w-full sm:w-2/3'>
            <p className='mb-3 text-left text-base leading-6 text-cool-gray'>
              Made with <span className='font-mono text-secondary-500'>:love:</span> by the AsyncAPI Initiative.
            </p>
            <p className='w-full text-left text-sm leading-6 text-cool-gray sm:w-2/3' data-testid='Footer-copyright'>
              Copyright &copy; AsyncAPI Project a Series of LF Projects, LLC. For web site terms of use, trademark
              policy and general project policies please see{' '}
              <a
                href='https://lfprojects.org'
                className='text-secondary-500 underline transition duration-300 ease-in-out hover:text-white'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://lfprojects.org
              </a>
            </p>
          </div>
          <div className='mt-8 block sm:mt-0'>
            <p className='block text-sm leading-6'>
              <a href='https://netlify.com' target='_blank' rel='noopener noreferrer'>
                <img
                  src='https://www.netlify.com/img/global/badges/netlify-color-bg.svg'
                  className='inline'
                  alt='Deploys by Netlify'
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
