import React from 'react';
import NavBar from '../components/navigation/NavBar';
import StickyNavbar from '../components/navigation/StickyNavbar';
import Heading from '../components/typography/Heading';
import AnnouncementHero from '../components/campaigns/AnnoucementHero';
import Button from '../components/buttons/Button';

function ErrorPage() {
  const image = '/img/illustrations/illustration.webp';
  return (
    <div className="text-center">
      <StickyNavbar>
        <NavBar className="max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto" />
      </StickyNavbar>
     
      <div className='items-center justify-center mt-20 flex-col md:flex-row'>
          <div>
            <AnnouncementHero className="my-4" />
            <header className='px-2 mt-12 '>
              <div className="text-center">
                <Heading className="mb-4 md:text-sm">
                  Oops, The page you are looking {` `}
                  <span className="block md:-mt-4 leading-12">
                    {' '}
                    for doesn't exist
                  </span>
                </Heading>
              </div>
            </header>
          </div>
          <div>
            <img src={image} className="mx-auto w-52" />
          </div>
        </div>
   

      <div className="text-center mt-8">
        <Button
          className="text-xl"
          text="Return To Home"
          href="/"
        />
      </div>
    </div>
  );
}

export default ErrorPage;
