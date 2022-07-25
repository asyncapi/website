import React, { useEffect, useState } from 'react';
import Head from '../Head';
import Container from './Container';
import IconAsyncAPI from '../icons/AsyncAPI';
import Link from 'next/link';

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
  const [showNavShadow, setShowNavShadow] = useState(false)
  if (!title || !description)
    throw new Error(
      'Props `title`, `description`, and `image` are required at GenericLayout component.'
    );
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setShowNavShadow(true)
        } else {
          setShowNavShadow(false);
        }
        
        console.log(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  return (
    <>
      <Head title={title} description={description} />
      <Container wide={wide}>
        <CommunityNav addShadow={showNavShadow} />
        {children}
      </Container>
    </>
  );
}
