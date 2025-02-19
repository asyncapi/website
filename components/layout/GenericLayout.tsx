import React from 'react';

import AnnouncementHero from '../campaigns/AnnouncementHero';
import Head from '../Head';
import Container from './Container';

interface IGenericLayoutProps {
  title: string;
  description: string;
  image: string;
  children?: React.ReactNode;
  wide?: boolean;
  hideBanner?: boolean;
}

/**
 * @description The generic layout with the content
 * @param props.title - The title of the page
 * @param props.description - The description of the page
 * @param props.image - The image of the page
 * @param props.children - The content of the page
 * @param props.wide - The width of the page
 * @param props.hideBanner - The banner of the page
 */
export default function GenericLayout({
  title,
  description,
  image,
  children,
  wide = true,
  // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
  hideBanner = false
}: IGenericLayoutProps) {
  if (!title || !description || !image) {
    throw new Error('Props `title`, `description`, and `image` are required at GenericLayout component.');
  }

  return (
    <div data-testid='GenericLayout'>
      <Head title={title} description={description} image={image} />
      <Container wide={wide}>
        <div data-testid='GenericLayout-banner'>
          <AnnouncementHero className={`m-4 text-center ${hideBanner && 'hidden'}`} small={true} />
        </div>
        <div id='main-content' data-testid='Generic-main'>
          {children}
        </div>
      </Container>
    </div>
  );
}
