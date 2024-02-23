import IconRocket from '../icons/Rocket';
import Button from './Button';

export default function OpenInPlaygroundButton() {
  const playgroundLoadUrl = encodeURI('https://raw.githubusercontent.com/asyncapi/asyncapi/v3.0.0/examples/simple-asyncapi.yml');

  return (
    <Button
      className='mt-2 block md:ml-2 md:mt-0 md:inline-block'
      bgClassName='bg-green-500'
      text='Open Playground'
      href={`https://playground.asyncapi.io?load=${playgroundLoadUrl}`}
      target='_blank'
      icon={<IconRocket className='-mb-1 ml-1 size-5' />}
    />
  );
}
