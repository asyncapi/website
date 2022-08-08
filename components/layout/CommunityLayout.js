import React from 'react';
import Head from '../Head';
import Container from './Container';
import NavBar from '../navigation/NavBar';
import StickyNavbar from '../navigation/StickyNavbar';


export default function CommunityLayout({
  title,
  description,
  children,
  wide = true,
}) {
  return (
    <>
      <Head title={title} description={description} />
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
      <Container wide={wide}>{children}</Container>
    </>
  );
}
