import { useState } from 'react'
import GenericLayout from '../../components/layout/GenericLayout'
import Button from '../../components/buttons/Button'
import IconDocuments from '../../components/icons/Documents'
import IconCode from '../../components/icons/Code'
import IconPowerPlug from '../../components/icons/PowerPlug'
import IconRocket from '../../components/icons/Rocket'
import GithubButton from '../../components/buttons/GithubButton'
import Select from '../../components/form/Select'
import generatorTemplates from '../../config/generator-templates.json'

export default function GeneratorPage() {
  const [template, setTemplate] = useState('@asyncapi/html-template')
  const [params, setParams] = useState('')
  const [cli, setCLI] = useState('npm')
  const [copyMessage, setCopyMessage] = useState('Copy')
  let codeBlock

  function onChangeTemplate(templateName) {
    setTemplate(templateName)
    if (!['@asyncapi/html-template', '@asyncapi/markdown-template'].includes(templateName)) {
      setParams(' -p server=production')
    } else {
      setParams('')
    }
  }

  function renderNpm() {
    return (
      <>
        <div>npm install -g @asyncapi/generator</div>
        <div>ag <span className="text-yellow-200">https://bit.ly/asyncapi</span> <span className="text-teal-400">{template}</span><span className="text-pink-400">{params} -o example</span></div>
      </>
    )
  }
  
  function renderDocker() {
    return (
      <>
        <div>docker run --rm -it -v ${`{PWD}`}/example:/app/example \</div>
        <div>asyncapi/generator <span className="text-yellow-200">https://bit.ly/asyncapi</span> <span className="text-teal-400">{template}</span><span className="text-pink-400">{params} -o example --force-write</span></div>
      </>
    )
  }

  function onClickCopy() {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(codeBlock)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
    selection.removeAllRanges()

    setCopyMessage('Copied!')
    setTimeout(() => {
      setCopyMessage('Copy')
    }, 2000)  
  }

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
        <div className="max-w-2xl mt-8 mx-auto">
          <div className="mb-1.5">
            <span className="text-sm text-gray-500 mr-2">Select a Generator template:</span>
            <Select
              options={generatorTemplates}
              selected={template}
              onChange={onChangeTemplate}
              className="shadow-outline-blue"
            />
          </div>
          <div className="relative">
            <button onClick={onClickCopy} className="absolute text-xs text-gray-500 right-2 top-1 cursor-pointer hover:text-gray-300 focus:outline-none">{copyMessage}</button>
            <div ref={e => codeBlock = e} className="bg-code-editor-dark py-2 pl-3 pr-10 rounded-t rounded-br text-gray-300 text-sm font-mono">
              {cli === 'npm' && renderNpm()}
              {cli === 'docker' && renderDocker()}
            </div>
          </div>
          <div className="text-xs">
            <nav>
              <ul>
                <li className={`bg-code-editor-dark inline-block rounded-b uppercase ${cli === 'npm' ? 'text-teal-300 font-bold' : 'text-gray-300 font-medium'} py-1 px-2 mr-px cursor-pointer hover:text-teal-300`} onClick={() => setCLI('npm')}>npm</li>
                <li className={`bg-code-editor-dark inline-block rounded-b uppercase ${cli === 'docker' ? 'text-teal-300 font-bold' : 'text-gray-300 font-medium'} py-1 px-2 mr-px cursor-pointer hover:text-teal-300`} onClick={() => setCLI('docker')}>Docker</li>
              </ul>
            </nav>
          </div>
        </div>
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
