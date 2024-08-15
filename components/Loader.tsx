import { twMerge } from 'tailwind-merge';

interface LoaderProps {
  className?: string;
  dark?: boolean;
}

/**
 * This component displays a loader.
 * @param {LoaderProps} props - The props for the Loader component
 * @param {string} props.className - Additional classes for the loader
 * @param {boolean} props.dark - Whether the loader should be in dark mode
 */
export default function Loader({ className = '', dark = false }: LoaderProps) {
  return (
    <div className={twMerge(`w-fit flex flex-col m-auto ${className}`)}>
      <svg
        className={`mx-auto animate-spin border-4 border-t-transparent ${dark ? 'border-white' : 'border-black'} size-10 rounded-full`}
        viewBox='0 0 24 24'
      ></svg>
      <div className={`my-2 ${dark ? 'text-white' : 'text-black'}`}>Waiting for response...</div>
    </div>
  );
}
