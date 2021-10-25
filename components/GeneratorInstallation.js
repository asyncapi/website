import { useState } from 'react'
import Select from '../components/form/Select'
import generatorTemplates from '../config/generator-templates.json'
import CodeBlock from './editor/CodeBlock'
import generatorflags from '../config/generator-flags.json'

export default function GeneratorInstallation({ }) {
  const [template, setTemplate] = useState('@asyncapi/html-template')
  // By default we will have output folder flag so its set here.
  const [params, setParams] = useState('-o example')
  const [specPath, setSpecPath] = useState('https://bit.ly/asyncapi')
  
  function onChangeTemplate(templateName) {
   
    setTemplate(templateName)
    if(templateName && generatorflags[templateName] ){
      const templateBasedJSON = generatorflags[templateName]
      // options are generated from generator-templates.json 
      // and flags are fetched from generator-flags.json, 
      // so it is mandatory to have check in case if any misses the option in future
      if(templateBasedJSON){
        setParams(templateBasedJSON.flag)
        setSpecPath(templateBasedJSON.specPath)
      }
    }
  }

  function getNpmCode() {
    return `npm install -g @asyncapi/generator
ag ${specPath} ${template} ${params}`
  }

  function getDockerCode() {
    return `docker run --rm -it -v \${PWD}/example:/app/example \\
asyncapi/generator ${specPath} ${template} ${params}`
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