import { twMerge } from 'tailwind-merge';

interface LoaderProps {
  // eslint-disable-next-line prettier/prettier

  /** The text to be displayed along with the loading animation. */
  loaderText?: string;

  /** The type of loader symbol to be displayed (Circular Animation or AsyncAPI Icon or Nothing). */
  loaderType?: 'circular' | 'icon' | null;

  /** Additional classes for the loader. */
  className?: string;

  /** Whether the loader should be in dark mode. */
  dark?: boolean;

  /** Whether the loader should be pulsating. */
  pulsating?: boolean;
}

/**
 * This component displays a loader.
 */
export default function Loader({
  loaderText = '',
  loaderType = null,
  className = '',
  dark = false,
  pulsating = false
}: LoaderProps) {
  const loaderIconPath: string = 'img/loaders/loader.png'; // asyncapi preloader icon

  return (
    <div className={twMerge(`w-fit flex gap-4 m-auto items-center ${pulsating ? 'animate-pulse ' : ''} ${className}`)}>
      {loaderType === 'circular' && (
        <svg
          className={`mx-auto animate-spin border-4 border-t-transparent ${dark ? 'border-white' : 'border-black'} size-10 rounded-full`}
          viewBox='0 0 24 24'
        />
      )}
      {loaderType === 'icon' && <img alt='Loading...' src={loaderIconPath} className='mx-auto w-16' />}

      <div className={`my-2 ${dark ? 'text-white' : 'text-black'}`}>{loaderText}</div>
    </div>
  );
}
