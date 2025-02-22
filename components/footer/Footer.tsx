import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { HeadingTypeStyle } from '@/types/typography/Heading';

import AsyncAPILogoLight from '../logos/AsyncAPILogoLight';
import Heading from '../typography/Heading';
import type { InitiativeLink, SocialMediaLink } from './FooterList';
import { initiativeLinks, socialMediaLinks } from './FooterList';

interface FooterProps {
  currentLanguage: string | undefined;
}

export default function Footer({ currentLanguage }: FooterProps) {
  const { t } = useTranslation('footer');

  return (
    <footer className='mt-12 bg-dark'>
      <div className='mx-auto max-w-screen-xl px-3 py-4 sm:px-6 md:py-12 lg:px-8 xl:py-16'>
        <nav className='flex flex-wrap justify-between gap-8 py-4 sm:py-10'>
          {/* Logo & Main Heading */}
          <div className='w-full md:w-auto'>
            <Link href='/' aria-label='AsyncAPI'>
              <span className='cursor-pointer' data-testid='Footer-logo-link'>
                <AsyncAPILogoLight className='mt-3 h-10 w-auto' />
              </span>
            </Link>
            <Heading className='mb-10 mt-8 text-white' typeStyle={HeadingTypeStyle.smSemibold}>
              {t('buildingFuture')}
            </Heading>
          </div>

          {/* Links Section */}
          <div className='flex flex-wrap gap-6 md:gap-12'>
            {/* Initiatives */}
            <div className='min-w-[150px]'>
              <Heading typeStyle={HeadingTypeStyle.smSemibold} className='text-white mb-2'>
                {t('initiative')}
              </Heading>
              <ul>
                {initiativeLinks.map((link: InitiativeLink, index: number) => (
                  <li key={index} className='py-1'>
                    <Link href={link.url}>
                      <span className='text-base text-cool-gray transition duration-300 ease-in-out hover:text-white'>
                        {t(link.label)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* News */}
            <div className='min-w-[150px]'>
              <Heading typeStyle={HeadingTypeStyle.smSemibold} className='text-white mb-2'>
                {t('news')}
              </Heading>
              <ul>
                <li className='py-1'>
                  <a href='mailto:press@asyncapi.io' className='text-cool-gray transition hover:text-white'>
                    {t('emailUs')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className='min-w-[150px]'>
              <Heading typeStyle={HeadingTypeStyle.smSemibold} className='text-white mb-2'>
                {t('social')}
              </Heading>
              <ul className='flex flex-col'>
                {socialMediaLinks.map((link: SocialMediaLink, index: number) => (
                  <li key={index} className='py-1'>
                    <a href={link.url} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2 text-cool-gray transition hover:text-white'>
                      {link.icon}
                      <span className='hidden sm:inline'>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className='flex flex-wrap items-center justify-between py-8 sm:py-12'>
          <div className='w-full sm:w-auto text-cool-gray text-sm'>
            <p className='mb-3'>{t('madeWithLove')}</p>
            <p>{t('copyright')}</p>
          </div>
          <div className='mt-6 sm:mt-0'>
            <a href='https://netlify.com' target='_blank' rel='noopener noreferrer'>
              <img src='https://www.netlify.com/img/global/badges/netlify-color-bg.svg' className='h-6' alt='Deploys by Netlify' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
