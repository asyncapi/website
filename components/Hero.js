import EveAndChan from './illustrations/EveAndChan'
import Button from './buttons/Button'
import ArrowRight from './icons/ArrowRight'

export default function Hero () {
  return (
    <div className="px-2 md:flex md:mt-16 md:px-0">
      <div className="text-center mb-8 md:flex-1 md:mb-0 md:w-1/2 md:text-left">
        <h1 className="text-primary-800 text-3xl font-bold md:text-4xl md:w-2/3 mb-4">Building the future of event-driven architectures.</h1>
        <h2 className="text-gray-500 text-xl font-normal mb-6">
          Open source tools to easily build and maintain your event-driven architecture.
          All powered by the AsyncAPI specification, the <strong>industry standard</strong> for defining asynchronous APIs.
        </h2>
        <Button text="Get Started" href="/docs/getting-started" icon={<ArrowRight className="-mb-1 h-5 w-5" />} />
      </div>
      <div className="text-center md:flex-1 md:flex">
        <EveAndChan className="inline-block sm:w-2/3 md:w-full md:block md:self-center" />
      </div>
    </div>
  )
}