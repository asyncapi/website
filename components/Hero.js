import Button from './buttons/Button'
import ArrowRight from './icons/ArrowRight'
import OpenInStudioButton from './buttons/OpenInStudioButton'
import Features from '../components/features'
import DemoAnimation from './DemoAnimation'
import AnnouncementHero from '../components/campaigns/AnnoucementHero'
import Heading from './typography/Heading'
import Paragraph from './typography/Paragraph'

export default function Hero({ className = '' }) {
  return (
    <div className={`px-2 mt-12 ${className}`}>
      <div className="text-center">
        <AnnouncementHero />
        <Heading level="h1" typeStyle="heading-xl" className="mb-4">
          Building the future of {` `}
          <span className="block md:-mt-4">
            {" "}
            Event-Driven Architectures (EDA)
          </span>
        </Heading>
        <Heading level="h2" typeStyle="body-lg" textColor="text-gray-700" className="mb-10 max-w-4xl mx-auto">
          Open-Source tools to easily build and maintain your event-driven
          architecture. All powered by the AsyncAPI specification, the {" "}
          <strong>industry standard</strong> for defining asynchronous APIs.
        </Heading>
        <Button className="block md:inline-block" text="Read the docs" href="/docs/getting-started" icon={<ArrowRight className="-mb-1 h-5 w-5" />} />
        <OpenInStudioButton text='Open Studio' className="md:ml-2" />
        <Paragraph typeStyle="body-sm" className="mt-4" textColor="text-gray-500">
          Proud to be part of the {" "}
          <a className="underline" href="https://www.linuxfoundation.org/">
            Linux Foundation
          </a>
        </Paragraph>
      </div>
      <div className="mt-8 md:mt-16">
        <DemoAnimation />
      </div>
      <Features />
    </div>
  );
}
