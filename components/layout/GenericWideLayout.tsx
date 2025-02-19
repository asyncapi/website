import React from 'react';

import AnnouncementHero from '../campaigns/AnnouncementHero';
import Head from '../Head';
import Row from './Row';

interface IGenericWideLayoutProps {
  title: string;
  description: string;
  image: string;
  children?: React.ReactNode;
  wide?: boolean;
}

/**
 * @description The generic layout with the content
 * @param props.title - The title of the page
 * @param props.description - The description of the page
 * @param props.image - The image of the page
 * @param props.children - The content of the page
 * @param props.wide - The width of the page
 */
export default function GenericWideLayout({
  title,
  description,
  image,
  children
  // wide = true
}: IGenericWideLayoutProps) {
  if (!title || !description || !image) {
    throw new Error('Props `title`, `description`, and `image` are required at GenericLayout component.');
  }

  return (
    <>
      <Head title={title} description={description} image={image} />
      <Row>
        <AnnouncementHero className='m-4 text-center' small={true} />
        {children}
      </Row>
    </>
  );
}
