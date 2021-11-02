import Button from './Button'
import IconRocket from '../icons/Rocket'

export default function OpenInStudioButton({ text = 'Open in Studio' }) {
  const sampleSpec = encodeURI('https://raw.githubusercontent.com/asyncapi/asyncapi/v2.2.0/examples/simple.yml')
  return (
    <Button
      className="block mt-2 md:mt-0 md:inline-block md:ml-2"
      bgClassName="bg-green-500"
      text={text}
      href={`https://studio.asyncapi.com?url=${sampleSpec}`}
      target="_blank"
      icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
    />
  )
}
