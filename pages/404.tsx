import Button from '@/components/buttons/Button';
import AnnouncementHero from '@/components/campaigns/AnnouncementHero';
import AsyncAPILogo from '@/components/logos/AsyncAPILogo';
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
          <AsyncAPILogo className='h-14 w-auto' />
        </div>
      </div>

      <div className='mt-8 text-center'>
        <Button className='text-xl' text='Return To Home' href='/' />
      </div>
    </div>
  );
}
