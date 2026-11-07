import Button from '@/components/buttons/Button';
import AnnouncementHero from '@/components/campaigns/AnnouncementHero';
import Heading from '@/components/typography/Heading';

/**
 * @description The ErrorPage component is the 404 page of the application.
 */
export default function ErrorPage() {
  return (
    <div className='text-center'>
      <div className='mt-20 flex-col items-center justify-center md:flex-row'>
        <div>
          <AnnouncementHero className='my-4' />
          <header className='mt-12 px-2 '>
            <div className='text-center'>
              <Heading className='mb-4  '>
                Oops, The page you are looking
                <span className='leading-12 block md:-mt-4'> for doesn&apos;t exist</span>
              </Heading>
            </div>
          </header>
        </div>
        <div className='mt-8 flex justify-center'>
          <img
            src='/img/illustrations/not-found.webp'
            alt='Page not found'
            className='mx-auto h-auto w-72 max-w-full sm:w-80'
          />
        </div>
      </div>

      <div className='mt-8 text-center'>
        <Button className='text-xl' text='Return To Home' href='/' />
      </div>
    </div>
  );
}
