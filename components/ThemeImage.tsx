import { twMerge } from 'tailwind-merge';

type ThemeImageProps = Readonly<{
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
}>;

/**
 * @description Shows a light or dark image based on the active theme.
 * `html.dark` is set before paint, so the Tailwind swap does not flash.
 * @param {ThemeImageProps} props - Component props.
 * @param {string} props.lightSrc - Image used while the site is in light mode.
 * @param {string} props.darkSrc - Image used while the site is in dark mode.
 * @param {string} props.alt - Accessible description of the image.
 * @param {string} [props.className] - Extra classes applied to both images.
 */
export default function ThemeImage({ lightSrc, darkSrc, alt, className }: ThemeImageProps) {
  const imageClassName = twMerge('w-full h-auto', className);

  return (
    <>
      <img src={lightSrc} alt={alt} className={twMerge(imageClassName, 'dark:hidden')} />
      <img src={darkSrc} alt={alt} className={twMerge(imageClassName, 'hidden dark:block')} />
    </>
  );
}
