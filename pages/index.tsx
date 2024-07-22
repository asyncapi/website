
import Head from '../components/Head';
import { Redirect } from '../utils/redirect';

/**
 * @description This is the home page which is the first page that loads when the user visits the website.
 */
export default function HomePage() {
  const loader: string = 'img/loaders/loader.png'; // preloader image for the tools

  Redirect();

  return (
    <>
      <Head title='AsyncAPI Initiative for event-driven APIs' />
      <div className='h-screen'>
        <div className='mx-auto my-60 flex w-fit animate-pulse gap-4 text-black'>
          <img alt='Loading...' src={loader} className='mx-auto w-16' />
          <div className='my-auto text-xl'>Loading...</div>
        </div>
      </div>
    </>
  );
}
