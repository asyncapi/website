import Button from './Button'
import IconRocket from '../icons/Rocket'

export default function OpenInPlaygroundButton() {
  const playgroundLoadUrl = encodeURI('https://raw.githubusercontent.com/asyncapi/asyncapi/v2.1.0/examples/simple.yml')
  return (
    <Button
      className="block mt-2 md:mt-0 md:inline-block md:ml-2"
      bgClassName="bg-green-500"
      text="Open Playground"
      href={`https://playground.asyncapi.io?load=${playgroundLoadUrl}`}
      target="_blank"
      icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
    />
  )
}
