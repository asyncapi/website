import React from 'react';

import { Float } from '@/types/components/FigurePropsType';

import Caption from './Caption';

interface FigureProps {
  src: string;
  caption: string;
  widthClass: string;
  className: string;
  float: Float;
  altOnly: string;
  imageClass?: string;
}

/**
 * This component displays a figure with image and a caption.
 * @param {FigureProps} props - The props for the Figure component
 * @param {string} props.src - The source URL for the image
 * @param {string} props.caption - The caption for the image
 * @param {string} props.widthClass - Additional width classes for the figure
 * @param {string} props.className - Additional classes for the figure
 * @param {Float} props.float - The float direction of the figure (Float.LEFT or Float.RIGHT)
 * @param {string} props.altOnly - The alternative text for the image if caption is not provided
 * @param {string} props.imageClass - Additional classes for the image
 */
export default function Figure({ src, caption, widthClass, className, float, altOnly, imageClass = '' }: FigureProps) {
  const alt = altOnly || caption;

  let floatClassNames = '';

  if (float === Float.LEFT) {
    floatClassNames = 'mr-4 float-left';
  } else if (float === Float.RIGHT) {
    floatClassNames = 'ml-4 float-right';
  }

  return (
    <figure className={`${className} ${floatClassNames} ${widthClass || 'w-full'}`} data-testid='Figure-div'>
      <div className='flex flex-col'>
        <img className={`${imageClass}`} src={src} alt={alt} data-testid='Figure-img' />
        {caption && <Caption>{caption}</Caption>}
      </div>
    </figure>
  );
}
