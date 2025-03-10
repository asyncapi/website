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

// FAQ Links
const faqLinks = [
  { label: 'General Questions', url: '/faq#general' },
  { label: 'Getting Started', url: '/faq#getting-started' },
  { label: 'Technical Support', url: '/faq#technical-support' },
];

export default function Footer() {
  return (
    <footer className="mt-12 margin: 0 auto bg-dark">
      <div className="overflow-hidden py-4 px-3 mx-auto max-w-screen-xl divide-y sm:p-6 md:py-12 lg:px-8 xl:py-16 divide-cool-gray">
        <nav className="flex flex-wrap justify-between py-4 sm:py-10">
          <div className="mr-14 w-full md:w-auto">
            <div className="">
              <Link href="/" aria-label="AsyncAPI">
                <span className="cursor-pointer" data-testid="Footer-logo-link">
                  <AsyncAPILogoLight className="mt-3 w-auto h-10" />
                </span>
              </Link>
            </div>
            <div className="">
              <Heading
                className="mt-12 mb-14 text-white"
                typeStyle={HeadingTypeStyle.smSemibold}
              >
                Building the future of <br /> Event-Driven Architectures.
              </Heading>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row">
            <div className="flex">
              <div className="px-0 mb-5 lg:px-10 lg:ml-5">
                <div className="py-2">
                  <div className="text-white">
                    <Heading typeStyle={HeadingTypeStyle.smSemibold}>
                      The Initiative
                    </Heading>
                  </div>
                </div>
                <ul className="justify-center">
                  {initiativeLinks.map(
                    (link: InitiativeLink, index: number) => (
                      <li
                        className="py-2"
                        key={index}
                        data-testid="Footer-initiative-links"
                      >
                        <Link href={link.url}>
                          <span className="text-base leading-6 transition duration-300 ease-in-out text-cool-gray hover:text-primary">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="px-14 mb-5 sm:px-8 sm:ml-10 md:ml-5">
                <div className="py-2">
                  <div className="text-white">
                    <Heading typeStyle={HeadingTypeStyle.smSemibold}>
                      News
                    </Heading>
                  </div>
                </div>
                <ul className="justify-center">
                  <li className="py-2">
                    <div className="text-base leading-6 transition duration-300 ease-in-out text-cool-gray hover:text-primary">
                      <a href="mailto:press@asyncapi.io">Email Us</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="px-0 mb-5 sm:px-10 sm:ml-5">
              <div className="py-2">
                <div className="text-white">
                  <Heading typeStyle={HeadingTypeStyle.smSemibold}>
                    FAQs
                  </Heading>
                </div>
              </div>
              <ul className="justify-center">
                {faqLinks.map((link, index) => (
                  <li className="py-2" key={index}>
                    <Link href={link.url}>
                      <span className="text-base leading-6 transition duration-300 ease-in-out text-cool-gray hover:text-primary">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-0 mb-5 sm:px-10 sm:ml-5">
              <div className="hidden py-2 sm:block">
                <div className="mr-12 text-white">
                  <Heading typeStyle={HeadingTypeStyle.smSemibold}>
                    Social
                  </Heading>
                </div>
              </div>
              <ul
                className="flex justify-start sm:flex-col"
                aria-label="AsyncAPI social media links"
              >
                {socialMediaLinks.map(
                  (link: SocialMediaLink, index: number) => (
                    <li
                      className="py-2 mr-3 sm:mr-0"
                      key={index}
                      data-testid="Footer-social-media-links"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center transition duration-300 ease-in-out text-cool-gray hover:text-primary">
                          <span className="sr-only">{`Follow AsyncAPI on ${link.label}`}</span>
                          {link.icon}
                          <span className="hidden absolute pr-5 pl-8 sm:block">
                            {link.label}
                          </span>
                        </div>
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div
          className="justify-between py-8 sm:flex sm:py-12 xl:mt-20"
          data-testid="Footer-content"
        >
          <div className="w-full sm:w-2/3">
            <p className="mb-3 text-base leading-6 text-left text-cool-gray">
              Made with{' '}
              <span className="font-mono text-secondary-500">:love:</span> by
              the AsyncAPI Initiative.
            </p>
            <p
              className="w-full text-sm leading-6 text-left sm:w-2/3 text-cool-gray"
              data-testid="Footer-copyright"
            >
              Copyright &copy; AsyncAPI Project a Series of LF Projects, LLC.
              For web site terms of use, trademark policy and general project
              policies please see{' '}
              <a
                href="https://lfprojects.org"
                className="underline transition duration-300 ease-in-out text-secondary-500 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://lfprojects.org
              </a>
            </p>
          </div>
          <div className="block mt-8 sm:mt-0">
            <p className="block text-sm leading-6">
              <a
                href="https://netlify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
                  className="inline"
                  alt="Deploys by Netlify"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
