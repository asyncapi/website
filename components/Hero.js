import Button from './buttons/Button'
import ArrowRight from './icons/ArrowRight'
import OpenInPlaygroundButton from './buttons/OpenInPlaygroundButton'
import Features from '../components/features'
import DemoAnimation from './DemoAnimation'
import AnnouncementHero from '../components/campaigns/AnnoucementHero'

export default function Hero({ className = '' }) {
  return (
    <div className={`px-2 mt-12 ${className}`}>
      <div className="text-center">
        <AnnouncementHero />
        <h1 className="text-primary-800 text-2xl font-bold md:text-6xl mb-4 leading-snug">
          Building the future of {` `}
          <span className="text-primary-400 block md:-mt-4">
            {" "}
            Event-Driven Architectures (EDA).
          </span>
        </h1>
        <h2 className="text-gray-500 text-lg font-normal mb-16 max-w-3xl mx-auto">
          Open Source tools to easily build and maintain your event-driven
          architecture. All powered by the AsyncAPI specification, the{" "}
          <strong>industry standard</strong> for defining asynchronous APIs.
        </h2>
        <Button
          className="block md:inline-block"
          text="Read the docs"
          href="/docs/getting-started"
          icon={<ArrowRight className="-mb-1 h-5 w-5" />}
        />
        <OpenInPlaygroundButton />
        <p className="mt-4 text-xs text-gray-500">
          Proud to be part of the{" "}
          <a className="underline" href="https://www.linuxfoundation.org/">
            Linux Foundation
          </a>
        </p>
      </div>
      <div className="mt-8 md:mt-16">
        <DemoAnimation />
      </div>
      <Features />
    </div>
  );
}
