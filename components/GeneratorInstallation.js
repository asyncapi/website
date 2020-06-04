import { useState } from 'react'
import lowlight from 'lowlight'
import Select from '../components/form/Select'
import generatorTemplates from '../config/generator-templates.json'
import CodeBlock from './editor/CodeBlock'

lowlight.registerLanguage('generator-cli', hljs => ({
  name: 'generator-cli',
  case_insensitive: true,
  contains: [
    {
      className: 'generator-command',
      begin: 'ag',
      end: /[^\\]{1}$/,
      contains: [
        {
          className: 'asyncapi-file',
          begin: 'https://bit.ly/asyncapi',
        },
        {
          className: 'generator-template',
          begin: '@asyncapi/',
          end: '-template',
        },
        {
          className: 'generator-param',
          begin: /[\-]{1,2}[\w]+ [\$\{\}\/:\'\"\w\d\-_=]+/,
        },
      ]
    },
    {
      className: 'generator-docker-command',
      begin: 'docker',
      end: /[^\\]{1}$/,
      contains: [
        {
          className: 'asyncapi-file',
          begin: 'https://bit.ly/asyncapi',
        },
        {
          className: 'generator-template',
          begin: '@asyncapi/',
          end: '-template',
        },
        {
          className: 'generator-param',
          begin: /[\-]{1,2}[\w]+ [\$\{\}\/:\'\"\w\d\-_=]+/,
        },
      ]
    },
  ]
}))

export default function GeneratorInstallation({ }) {
  const [template, setTemplate] = useState('@asyncapi/html-template')
  const [params, setParams] = useState('')

  function onChangeTemplate(templateName) {
    setTemplate(templateName)
    if (!['@asyncapi/html-template', '@asyncapi/markdown-template'].includes(templateName)) {
      setParams(' -p server=production')
    } else {
      setParams('')
    }
  }

  function getNpmCode() {
    return `npm install -g @asyncapi/generator
ag https://bit.ly/asyncapi ${template}${params} -o example`
  }

  function getDockerCode() {
    return `docker run --rm -it -v \${PWD}/example:/app/example \\
asyncapi/generator https://bit.ly/asyncapi ${template}${params} -o example`
  }

  return (
    <div className="relative max-w-full mt-8 mx-auto">
      <div className="mb-4">
        <span className="text-sm text-gray-500 mr-2">Select a Generator template:</span>
        <Select
          options={generatorTemplates}
          selected={template}
          onChange={onChangeTemplate}
          className="shadow-outline-blue"
        />
      </div>
      <CodeBlock
        language="generator-cli"
        textSizeClassName="text-sm"
        className="shadow-lg"
        codeBlocks={[{
          language: 'npm',
          code: getNpmCode(),
        }, {
          language: 'Docker',
          code: getDockerCode(),
        }]}
      />
    </div>
  )
}