import Button from './buttons/Button'
import ArrowRight from './icons/ArrowRight'
import OpenInStudioButton from './buttons/OpenInStudioButton'
import Features from '../components/features'
import DemoAnimation from './DemoAnimation'
import AnnouncementHero from '../components/campaigns/AnnoucementHero'
import Heading from './typography/Heading'
import Paragraph from './typography/Paragraph'
import { SearchButton } from './AlgoliaSearch';
import IconLoupe from './icons/Loupe';

export default function Hero({ className = ''}) {
  return (
    <header className={`px-2 mt-12 ${className}`}>
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
        <div className='flex flex-row items-center justify-center'>
          <Button className="block md:inline-block" text="Read the docs" href="/docs" icon={<ArrowRight className="-mb-1 h-5 w-5" />} />
          <SearchButton 
            className="hidden sm:flex items-center text-left space-x-3 px-4 py-3 ml-2 bg-white border-secondary-500 border text-secondary-500 hover:text-white shadow-md bg-secondary-100 hover:bg-secondary-500 transition-all duration-500 ease-in-out rounded-md"
          >
            {({ actionKey }) => (
              <>
                <IconLoupe />
                <span className="flex-auto">Quick search...</span>
                {actionKey && (
                  <kbd className="font-sans font-semibold dark:text-slate-500">
                    <abbr
                      title={actionKey.key}
                      className="no-underline text-slate-300 dark:text-slate-500"
                    >
                      {actionKey.shortKey}
                    </abbr>{' '}
                    K
                  </kbd>
                )}
              </>
            )}
          </SearchButton>
          <OpenInStudioButton text='Open Studio' className='ml-2' />
        </div>
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
    </header>
  );
}
