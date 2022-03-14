import GenericLayout from '../../components/layout/GenericLayout'
import IconDocuments from '../../components/icons/Documents'
import IconCode from '../../components/icons/Code'
import IconPowerPlug from '../../components/icons/PowerPlug'
import GithubButton from '../../components/buttons/GithubButton'
import GeneratorInstallation from '../../components/GeneratorInstallation'
import Heading from '../../components/typography/Heading'
import Paragraph from '../../components/typography/Paragraph'

export default function GeneratorPage() {
  function renderButtons () {
    return (
      <div className="mt-8">
        {/* <Button
          text="Learn more"
          href="/docs/tools/generator"
          iconPosition="left"
          icon={<IconRocket className="inline-block w-6 h-6 -mt-1" />}
          className="w-full mb-2 sm:w-auto sm:mb-0 sm:mr-2"
        /> */}
        <GithubButton
          className="w-full sm:w-auto"
          href="https://www.github.com/asyncapi/generator"
        />
      </div>
    )
  }

  const description = 'Generate documentation, code, and more out of your AsyncAPI files with the Generator.'
  const image = '/img/social/generator.png'

  return (
    <GenericLayout
      title="Generator"
      description={description}
      image={image}
      wide
    >
      <div className="py-12 overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative text-center">
            <Heading level="h1" typeStyle="heading-lg">
              Docs, Code, Anything!
            </Heading>
            <Paragraph className="mt-4">
              {description}
            </Paragraph>
          </div>

          <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative lg:mt-8">
              <Heading level="h4" typeStyle="heading-md-semibold">
                Installation & Usage
              </Heading>
              <Paragraph className="mt-3 lg:pr-4">
                Start using Generator really quickly. Select one of the multiple templates we offer and start generating documentation and code in a few seconds.
              </Paragraph>
              {renderButtons()}
            </div>
            
            <GeneratorInstallation />

            <div className="relative mt-20">
              <Heading level="h4" typeStyle="heading-md-semibold">
                Ready to use
              </Heading>
              <Paragraph className="mt-3 lg:pr-4">
                The Generator is our solution to automatically generate documentation and code from your AsyncAPI files. It comes packed with lots of cool features you can't miss. Have a look!
              </Paragraph>

              <ul className="mt-10 lg:pr-4">
                <li>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-100 border border-gray-900 text-gray-900">
                        <IconDocuments className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <Heading level="h4" typeStyle="heading-sm-semibold">
                        HTML &amp; Markdown
                      </Heading>
                      <Paragraph typeStyle="body-md" className="mt-2">
                        Generate beautiful HTML documentation that's easy to share with your team and customers. Markdown docs that will seat along with your code? Perfect!
                      </Paragraph>
                    </div>
                  </div>
                </li>
                <li className="mt-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-100 border border-gray-900 text-gray-900">
                        <IconCode className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <Heading level="h4" typeStyle="heading-sm-semibold">
                        Node.js, Java, Python, and more...
                      </Heading>
                      <Paragraph typeStyle="body-md" className="mt-2">
                        Generate code out of your AsyncAPI files in your favourite programming language. Speed up the time-to-first-prototype. Keep using it even after you wrote your custom business logic.
                      </Paragraph>
                    </div>
                  </div>
                </li>
                <li className="mt-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-100 border border-gray-900 text-gray-900">
                        <IconPowerPlug className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <Heading level="h4" typeStyle="heading-sm-semibold">
                        Highly extensible
                      </Heading>
                      <Paragraph typeStyle="body-md" className="mt-2">
                        Don't see your programming language of choice? Want to generate docs that meet your brand look and feel? Create your custom templates or extend existing ones.
                      </Paragraph>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0">
              <img className="relative rounded shadow-lg mx-auto" src="/img/tools/generator-1.png" alt="" />
              <img className="relative rounded mt-8 shadow-lg mx-auto" src="/img/tools/generator-2.png" alt="" />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          {renderButtons()}
        </div>
      </div>
    </GenericLayout>
  )
}
