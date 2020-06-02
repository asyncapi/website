import { useState } from 'react'
import Select from '../components/form/Select'
import IconClipboard from '../components/icons/Clipboard'
import generatorTemplates from '../config/generator-templates.json'

export default function GeneratorInstallation({}) {
  const [template, setTemplate] = useState('@asyncapi/html-template')
  const [params, setParams] = useState('')
  const [cli, setCLI] = useState('npm')
  const [showIsCopied, setShowIsCopied] = useState(false)
  let codeBlock

  const tabItemsCommonClassNames = 'inline-block uppercase border-teal-300 py-1 px-2 mx-px cursor-pointer hover:text-teal-300'
  const tabItemsClassNames = `${tabItemsCommonClassNames} text-gray-300`
  const tabItemsActiveClassNames = `${tabItemsCommonClassNames} text-teal-300 font-bold border-b-2`

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
        <div>asyncapi/generator <span className="text-yellow-200">https://bit.ly/asyncapi</span> <span className="text-teal-400">{template}</span><span className="text-pink-400">{params} -o example</span></div>
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

    setShowIsCopied(true)
    setTimeout(() => {
      setShowIsCopied(false)
    }, 2000)
  }

  return (
    <div className="max-w-2xl mt-8 mx-auto">
      <div className="mb-4">
        <span className="text-sm text-gray-500 mr-2">Select a Generator template:</span>
        <Select
          options={generatorTemplates}
          selected={template}
          onChange={onChangeTemplate}
          className="shadow-outline-blue"
        />
      </div>
      <div className="relative bg-code-editor-dark rounded">
        <div className="text-xs pb-2 pt-1 pl-1">
          <nav>
            <ul>
              <li className={cli === 'npm' ? tabItemsActiveClassNames : tabItemsClassNames} onClick={() => setCLI('npm')}>npm</li>
              <li className={cli === 'docker' ? tabItemsActiveClassNames : tabItemsClassNames} onClick={() => setCLI('docker')}>Docker</li>
            </ul>
          </nav>
        </div>
        <button onClick={onClickCopy} className="absolute text-xs text-gray-500 right-2 top-1 cursor-pointer hover:text-gray-300 focus:outline-none" title="Copy to clipboard">
          { showIsCopied && <span className="inline-block pt-1 mr-2">Copied!</span> }
          <span className="inline-block pt-1"><IconClipboard className="inline-block w-4 h-4 -mt-1" /></span>
        </button>
        <div ref={e => codeBlock = e} className="py-2 pl-3 pr-10 text-gray-300 text-sm font-mono">
          {cli === 'npm' && renderNpm()}
          {cli === 'docker' && renderDocker()}
        </div>
      </div>
    </div>
  )
}