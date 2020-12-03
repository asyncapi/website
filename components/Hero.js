import Button from './buttons/Button'
import ArrowRight from './icons/ArrowRight'
import OpenInPlaygroundButton from './buttons/OpenInPlaygroundButton'
import DemoAnimation from './DemoAnimation'
import YoutubeButton from './buttons/YoutubeButton'

export default function Hero ({ className = '' }) {
  return (
    <div className={`px-2 mt-12 ${className}`}>
      <div className="text-center">

        <div className="bg-gray-50 mb-12 py-28 border border-gray-200">
          <h1 className="text-6xl font-extrabold">
            <span className="countdown-text-gradient">5 days...</span>
          </h1>
          <p className="mb-2 text-xl text-gray-500">To change things forever. To take AsyncAPI to a whole new level.</p>
          <p className="text-xl font-bold text-gray-700">Are you ready for the big announcement?</p>
          <YoutubeButton href="/" text="Watch it live on Youtube" className="mt-4 inline-block" />
        </div>

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
