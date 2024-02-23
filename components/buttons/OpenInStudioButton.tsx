import IconRocket from '../icons/Rocket';
import Button from './Button';

export default function OpenInStudioButton({ text = 'Open in Studio', className = '' }) {
  const sampleSpec = encodeURI('https://raw.githubusercontent.com/asyncapi/asyncapi/master/examples/simple-asyncapi.yml');

  return (
    <Button
      className={`border-secondary-500 text-secondary-500 group block border text-center shadow-md hover:text-white md:mt-0 md:inline-block ${className}`}
      bgClassName='bg-secondary-100 hover:bg-secondary-500'
      text={text}
      href={`https://studio.asyncapi.com?url=${sampleSpec}`}
      target='_blank'
      icon={<IconRocket className='-mb-1 ml-1 size-5' />}
    />
  );
}
