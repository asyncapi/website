import GenericLayout from '../../components/layout/GenericLayout'
import Button from '../../components/buttons/Button'
import IconDocuments from '../../components/icons/Documents'
import IconCode from '../../components/icons/Code'
import IconPowerPlug from '../../components/icons/PowerPlug'
import IconRocket from '../../components/icons/Rocket'
import GithubButton from '../../components/buttons/GithubButton'
import GeneratorInstallation from '../../components/GeneratorInstallation'

export default function GeneratorPage() {
  return (
    <GenericLayout title="Generator" wide>
      <div className="py-16 overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <h3 className="text-center text-3xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Docs, Code, Anything!
            </h3>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
              Generate documentation, code, and more out of your AsyncAPI files with the Generator.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <h4 className="text-2xl leading-8 font-normal text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                Ready to use
              </h4>
              <p className="mt-3 text-lg leading-7 text-gray-500">
                The Generator is our solution to automatically generate documentation and code from your AsyncAPI files. It comes packed with lots of cool features you can't miss. Have a look!
              </p>

              <ul className="mt-10">
                <li>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <IconDocuments className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h5 className="text-lg leading-6 font-normal text-gray-900">HTML &amp; Markdown</h5>
                      <p className="mt-2 text-base leading-6 text-gray-500">
                        Generate beautiful HTML documentation that's easy to share with your team and customers. Markdown docs that will seat along with your code? Perfect!
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <IconCode className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h5 className="text-lg leading-6 font-normal text-gray-900">Node.js, Java, Python, and more...</h5>
                      <p className="mt-2 text-base leading-6 text-gray-500">
                        Generate code out of your AsyncAPI files in your favourite programming language. Speed up the time-to-first-prototype. Keep using it even after you wrote your custom business logic.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                        <IconPowerPlug className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h5 className="text-lg leading-6 font-normal text-gray-900">Highly extensible</h5>
                      <p className="mt-2 text-base leading-6 text-gray-500">
                        Don't see your programming language of choice? Want to generate docs that meet your brand look and feel? Create your custom templates or extend existing ones.
                      </p>
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

        <div className="relative mt-12 lg:mt-16">
          <h4 className="text-center text-2xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
           Installation & Usage
          </h4>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
            You can use it now. It's open source.
          </p>
        </div>
        <GeneratorInstallation />
        <div className="max-w-xl mt-8 mx-auto text-center">
          <Button
            text="Learn more"
            href="/docs/tools/generator"
            iconPosition="left"
            icon={<IconRocket className="inline-block w-6 h-6 -mt-1" />}
            className="w-full mb-2 sm:w-auto sm:mb-0"
          />
          <GithubButton
            className="w-full sm:w-auto sm:ml-2"
            href="https://www.github.com/asyncapi/generator"
          />
        </div>
      </div>
    </GenericLayout>
  )
}
