import Button from './buttons/Button'
import ArrowRight from './icons/ArrowRight'
import OpenInPlaygroundButton from './buttons/OpenInPlaygroundButton'
import DemoAnimation from './DemoAnimation'

export default function Hero ({ className = '' }) {
  return (
    <div className={`px-2 mt-12 ${className}`}>
      <div className="text-center">
        <h1 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">
          Building the future of event-driven architecture.
        </h1>
        <h2 className="text-gray-500 text-xl font-normal mb-6 max-w-3xl mx-auto">
          Open source tools to easily build and maintain your event-driven architecture.
          All powered by the AsyncAPI specification, the <strong>industry standard</strong> for defining asynchronous APIs.
        </h2>
        <Button className="block md:inline-block" text="Read the docs" href="/docs/getting-started" icon={<ArrowRight className="-mb-1 h-5 w-5" />} />
        <OpenInPlaygroundButton />
      </div>

      <div className="mt-8 md:mt-16">
        <DemoAnimation />
      </div>
    </div>
  )
}
