import React from 'react';

import IconRocket from '../icons/Rocket';
import Button from './Button';

/**
 * @description The OpenInStudioButton component is a button that links to the AsyncAPI Studio with a given spec.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.className - The class name to be applied to the button.
 * @returns {React.ReactElement}
 */
export default function OpenInStudioButton({ text = 'Open in Studio', className = '' }) {
  const sampleSpec = encodeURI(
    'https://raw.githubusercontent.com/asyncapi/asyncapi/master/examples/simple-asyncapi.yml'
  );

  return (
    <Button
      className={`group block border border-secondary-500 text-center text-secondary-500 shadow-md 
                hover:text-white md:mt-0 md:inline-block ${className}`}
      bgClassName='bg-secondary-100 hover:bg-secondary-500'
      text={text}
      href={`https://studio.asyncapi.com?url=${sampleSpec}`}
      target='_blank'
      icon={<IconRocket className='-mb-1 ml-1 size-5' />}
    />
  );
}
