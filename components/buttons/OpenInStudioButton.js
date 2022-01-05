import Button from './Button'
import IconRocket from '../icons/Rocket'

export default function OpenInStudioButton({ text = 'Open in Studio', className = '' }) {
  const sampleSpec = encodeURI('https://raw.githubusercontent.com/asyncapi/asyncapi/v2.2.0/examples/simple.yml')
  return (
    <Button
      className={`text-center block mt-2 md:mt-0 md:inline-block border-primary-500 border-2 text-primary-500 hover:text-primary-500 ${className}`}
      bgClassName="bg-white"
      text={text}
      href={`https://studio.asyncapi.com?url=${sampleSpec}`}
      target="_blank"
      icon={<IconRocket className="w-5 h-5 -mb-1 ml-1" />}
    />
  )
}
