import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt?: string;
  className?: string;
  dataTestId: string;
}

/*
 * This component displays the responsive image of the sponsors.
 * @param {ResponsiveImageProps} props - The props for ResponsiveImage component.
 * @param {string} props.src - Source of the image displayed.
 * @param {string} props.alt - Alternative text for the image, important for accessibility.
 * @param {string} props.className - Additional CSS class names for styling the image.
 * @param {string} props.dataTestId - A string for identifying the element during testing.
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt, className, dataTestId }) => {
  return <img src={src} alt={alt} className={`${className} w-full h-12 object-contain`} data-testid={dataTestId} />;
};

export default ResponsiveImage;
