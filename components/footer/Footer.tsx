import Link from 'next/link';
import React from 'react';

import { HeadingTypeStyle } from '@/types/typography/Heading';

import AsyncAPILogoLight from '../logos/AsyncAPILogoLight';
import Heading from '../typography/Heading';
import type { InitiativeLink, SocialMediaLink } from './FooterList';
import { initiativeLinks, socialMediaLinks as originalSocialMediaLinks } from './FooterList';

// Filter out "Email Us" from the general social media links
const socialMediaLinks = originalSocialMediaLinks.filter(link => link.label !== 'Email Us');

// Extract "Email Us" separately for use in the Contact Us section
const emailUsLink = originalSocialMediaLinks.find(link => link.label === 'Email Us');

export default function Footer() {
  return (
    <footer className='margin: 0 auto mt-12 bg-dark'>
      <div className='mx-auto max-w-screen-xl divide-y divide-cool-gray overflow-hidden px-3 py-4 sm:p-6 md:py-12 lg:px-8 xl:py-16'>
        <nav className='flex flex-wrap justify-between py-4 sm:py-10'>
          <div className='mr-14 w-full md:w-auto'>
            <Link href='/' aria-label='AsyncAPI'>
              <span className='cursor-pointer' data-testid='Footer-logo-link'>
                <AsyncAPILogoLight className='mt-3 h-10 w-auto' />
              </span>
            </Link>
            <Heading className='mb-14 mt-12 text-white' typeStyle={HeadingTypeStyle.smSemibold}>
              Building the future of <br /> Event-Driven Architectures.
            </Heading>
          </div>

          <div className='flex flex-col sm:flex-row'>
            <div className='flex'>
              <div className='mb-5 px-0 lg:ml-5 lg:px-10'>
                <Heading typeStyle={HeadingTypeStyle.smSemibold} className='text-white'>The Initiative</Heading>
                <ul>
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

              {/* News Section (Email Us added here and News -> ContactUS) */}
              <div className='mb-5 px-14 sm:ml-10 sm:px-8 md:ml-5'>
                <Heading typeStyle={HeadingTypeStyle.smSemibold} className='text-white'>Contact Us</Heading>
                <ul>
                  {emailUsLink && (
                    <li className='py-2'>
                      <a href='mailto:press@asyncapi.io' className='flex items-center text-base leading-6 text-cool-gray transition duration-300 ease-in-out hover:text-white' >
                        {emailUsLink.icon}
                        <span className='ml-2 '>Email Us</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>


            <div className='mb-5 px-0 sm:ml-5 sm:px-10'>
              <Heading typeStyle={HeadingTypeStyle.smSemibold} className='text-white'>Social</Heading>
              <ul className='flex justify-start sm:flex-col' aria-label='AsyncAPI social media links'>
                {socialMediaLinks.map((link: SocialMediaLink, index: number) => (
                  <li className='mr-3 py-2 sm:mr-0' key={index} data-testid='Footer-social-media-links'>
                    <a href={link.url} target='_blank' rel='noopener noreferrer' className='flex items-center text-cool-gray transition duration-300 ease-in-out hover:text-white'>
                      {link.icon}
                      <span className='ml-2 hidden sm:block'>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
}
