import React, { useEffect, useState } from 'react';
import Head from '../Head';
import Container from './Container';
import IconAsyncAPI from '../icons/AsyncAPI';
import Link from 'next/link';
import NavBar from '../navigation/NavBar';
import StickyNavbar from '../navigation/StickyNavbar';

const links = [
  {
    name: 'Tutorials',
  },
  {
    name: 'Tech Talks',
  },
  {
    name: 'Get Involved',
  },
  {
    name: 'Community Docs',
  },
];

function CommunityNav({ addShadow }) {
  return (
    <div className="top-0 w-full p-1 border-none sticky z-50">
      <nav
        className={`p-5 flex items-center justify-between z-50 ${
          addShadow && 'bg-white shadow-lg rounded-md'
        } `}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <Link href="/">
            <a>
              <IconAsyncAPI />
            </a>
          </Link>
          <div className="flex">
            {links.map((link) => (
              <div className="ml-10 text-sm" key={link.name}>
                {link.name}
              </div>
            ))}
          </div>
        </div>
        <div>Login</div>
      </nav>
    </div>
  );
}

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
