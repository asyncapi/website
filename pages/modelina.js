import GenericWideLayout from '../components/layout/GenericWideLayout'
import { useState } from 'react'
import Select from '../components/form/Select'
import CodeBlock from '../components/editor/CodeBlock'
import modelinaLanguageOptions from '../config/modelina-language-options.json'
import MonacoEditorWrapper from '../components/editor/MonacoEditorWrapper'
import {parse} from '@asyncapi/parser'
import TypeScriptOptions from '../components/modelina/TypeScriptGenerator'
import JavaOptions from '../components/modelina/JavaGenerator'
import JavaScriptOptions from '../components/modelina/JavaScriptGenerator'
import GoOptions from '../components/modelina/GoGenerator'
import CSharpOptions from '../components/modelina/CSharpGenerator'
let defaultAsyncapiFile = {
  "asyncapi": "2.1.0",
  "info": {
    "title": "Streetlights API",
    "version": "1.0.0",
    "description": "The Smartylighting Streetlights API allows you\nto remotely manage the city lights.\n",
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0"
    }
  },
  "servers": {
    "mosquitto": {
      "url": "mqtt://test.mosquitto.org",
      "protocol": "mqtt"
    }
  },
  "channels": {
    "light/measured": {
      "publish": {
        "summary": "Inform about environmental lighting conditions for a particular streetlight.",
        "operationId": "onLightMeasured",
        "message": {
          "name": "LightMeasured",
          "payload": {
            "type": "object",
            "$id": "LightMeasured",
            "properties": {
              "id": {
                "type": "integer",
                "minimum": 0,
                "description": "Id of the streetlight."
              },
              "lumens": {
                "type": "integer",
                "minimum": 0,
                "description": "Light intensity measured in lumens."
              },
              "sentAt": {
                "type": "string",
                "format": "date-time",
                "description": "Date and time when the message was sent."
              }
            }
          }
        }
      }
    }
  }
}
class ModelinaExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: JSON.stringify(defaultAsyncapiFile, null, 4),
      codeblockModels: [], 
      generatorCode: '', 
      rawGeneratorCode: '',
      generator: undefined,
      generatorOptions: undefined, 
      language: 'java'
    }

    this.generateOutput = this.generateOutput.bind(this)
    this.onGeneratorChange = this.onGeneratorChange.bind(this)
    this.setNewLanguageOptions = this.setNewLanguageOptions.bind(this)
  }
  componentDidMount(){
    this.setNewLanguageOptions(this.state.language)
  }

  async generateOutput() {
    try {
      const parsedInput = await parse(this.state.input, {path: './'}) 
      //generator.generate(input, {processorOptions: {asyncapi: {path: './'}}}).then((models) => {
      const models = await this.state.generator.generate(parsedInput)
      const newCodeblockModels = [] 
      for (const model of models) {
        newCodeblockModels.push({
          language: this.state.language,
          title: model.$id,
          code: `${model.dependencies.join('\n')}\n${model.result}`
        })
      }
      const newGeneratorCode = `${this.state.rawGeneratorCode}
//const input = AsyncAPI document
const models = await generator.generate(input)`
      this.setState({...this.state, codeblockModels: newCodeblockModels, generatorCode: newGeneratorCode})
      this.props.onError(undefined)
    } catch(e){
      this.props.onError(e)
    }
  }
  async onGeneratorChange({generator, generatorCode: rawGeneratorCode}){
    this.setState({...this.state, generator, rawGeneratorCode})
    await this.generateOutput()
  }
  setNewLanguageOptions(newLanguage){
    let generatorOptions
    if(newLanguage === 'typescript'){
      generatorOptions = <TypeScriptOptions key={"typescript"} onGeneratorChange={this.onGeneratorChange} onInit={this.onGeneratorChange}/>
    } else if(newLanguage === 'javascript'){
      generatorOptions = <JavaScriptOptions key={"javascript"} onGeneratorChange={this.onGeneratorChange} onInit={this.onGeneratorChange}/>
    } else if(newLanguage === 'go'){
      generatorOptions = <GoOptions key={"go"} onGeneratorChange={this.onGeneratorChange} onInit={this.onGeneratorChange}/>
    } else if(newLanguage === 'csharp'){
      generatorOptions = <CSharpOptions key={"csharp"} onGeneratorChange={this.onGeneratorChange} onInit={this.onGeneratorChange}/>
    } else if(newLanguage === 'java'){
      generatorOptions = <JavaOptions key={"java"} onGeneratorChange={this.onGeneratorChange} onInit={this.onGeneratorChange}/>
    }
    this.setState({...this.state, generatorOptions: generatorOptions, language: newLanguage})
  }
  render() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12">
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-1 text-center">
              <label className="inline-flex items-center ml-6">
                <span className="text-sm text-gray-500 mr-2">Select the desired language:</span>
                <Select
                  options={modelinaLanguageOptions}
                  selected={this.state.language}
                  onChange={this.setNewLanguageOptions}
                  className="shadow-outline-blue"
                />
                <span className="text-sm text-gray-400 mr-2 ml-5">Missing a language? Please let us know!</span>
              </label>
            </div>
            <div className="col-span-1 pr-96 pl-96">
              {this.state.generatorOptions}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <MonacoEditorWrapper
            key={"input"}
            value={this.state.input}
            onChange={(_,change) => {this.setState({input: change}); this.generateOutput()}}
            language="yaml"
            height="300px"
          />
        </div>
        <div className="col-span-1 row-span-2">
          <CodeBlock
            key={"models"}
            language="javascript"
            textSizeClassName="text-sm"
            className="shadow-lg h-full w-full"
            codeBlocks={this.state.codeblockModels === undefined || this.state.codeblockModels.length === 0 ? [{code: ''}] : this.state.codeblockModels}
          />
        </div>
        <div className="col-span-1">
          <CodeBlock
            key={"generator"}
            textSizeClassName="text-sm"
            className="shadow-lg h-full w-full"
            codeBlocks={[{
              language:'js',
              title: 'Generator code',
              code: this.state.generatorCode || ''
            }]}
          />
        </div>
      </div>
    )
  }
}

export default function ModelinaPlaygroundPage() {
  const [error, setError] = useState()

  const description = 'Sometimes you just want to generate data models for your payload'
  const image = '/img/social/generator.png'

  return (
  <GenericWideLayout
    title="Generator"
    description={description}
    image={image}
    wide>
    <div>
      <div className="relative">
        <h3 className="text-center text-3xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Modelina
        </h3>
        <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
          {description}
        </p>
      </div>

    { error &&
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Holy smokes!</strong>
        <span className="block sm:inline">{error}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => {setError(undefined)}}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
    }
    <ModelinaExample key="modelina" onError={setError} />
    </div>
  </GenericWideLayout>
  )
}
