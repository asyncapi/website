import Button from './Button'
import IconRocket from '../icons/Rocket'

export default function OpenInStudioButton({ text = 'Open in Studio', className = '' }) {
  const sampleSpec = encodeURI('https://raw.githubusercontent.com/asyncapi/asyncapi/v2.3.0/examples/simple.yml')
  return (
    <Button
      className={`text-center block md:mt-0 md:inline-block border-secondary-500 border text-secondary-500 hover:text-white shadow-md group ${className}`}
      bgClassName="bg-secondary-100 hover:bg-secondary-500"
      text={text}
      href={`https://studio.asyncapi.com?url=${sampleSpec}`}
      target="_blank"
      icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
    />
  )
}
