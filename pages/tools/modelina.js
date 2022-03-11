import GenericLayout from '../../components/layout/GenericLayout'
import React, { useRef, useState } from 'react'
import Select from '../../components/form/Select'
import CodeBlock from '../../components/editor/CodeBlock'
import Tabs from '../../components/tabs/Tabs'
import modelinaLanguageOptions from '../../config/modelina-language-options.json'
import GithubButton from '../../components/buttons/GithubButton'
import Button from '../../components/buttons/Button'
import IconRocket from '../../components/icons/Rocket'
import MonacoEditorWrapper from '../../components/editor/MonacoEditorWrapper'
import {parse} from '@asyncapi/parser'
import TypeScriptOptions from '../../components/modelina/TypeScriptGenerator'
import JavaOptions from '../../components/modelina/JavaGenerator'
import JavaScriptOptions from '../../components/modelina/JavaScriptGenerator'
import GoOptions from '../../components/modelina/GoGenerator'
import CSharpOptions from '../../components/modelina/CSharpGenerator'
import Heading from '../../components/typography/Heading'
import Paragraph from '../../components/typography/Paragraph'

class ModelinaPlayground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: JSON.stringify(playgroundAsyncAPIDocument, null, 4),
      codeblockModels: [], 
      generatorCode: '', 
      rawGeneratorCode: '',
      generator: undefined,
      generatorOptions: undefined, 
      language: 'java',
      loaded: false,
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
          title: model.modelName,
          code: `${model.dependencies.join('\n')}\n\n${model.result}`.trim(),
        });
      }
      const newGeneratorCode = `${this.state.rawGeneratorCode}

// const input = ...AsyncAPI document
const models = await generator.generate(input)`
      this.setState({...this.state, codeblockModels: newCodeblockModels, generatorCode: newGeneratorCode})
      this.props.onError(undefined)
    } catch(e){
      console.log(e)
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
    const { loaded, generatorOptions } = this.state;

    const tabs = [
      {
        id: 'AsyncAPI Document',
        content: (
          <div className="h-full bg-code-editor-dark text-white px-4 rounded-b shadow-lg">
            <MonacoEditorWrapper
              value={this.state.input}
              onChange={(_,change) => {
                this.setState({ input: change });
                this.generateOutput();
              }}
              editorDidMount={() => {
                this.setState({ loaded: true });
              }}
              language="yaml"
            />
          </div>
        )
      },
      {
        id: 'Generator Code',
        content: (
          <CodeBlock
            textSizeClassName="text-sm"
            className="shadow-lg h-full w-full rounded-t-none"
            highlightClassName="h-full"
            codeBlocks={[{
              language:'js',
              title: 'Generator code',
              code: this.state.generatorCode || ''
            }]}
          />
        )
      },
      {
        id: 'Options',
        content: (
          <div className="h-full bg-code-editor-dark text-white px-4 rounded-b shadow-lg font-bold">
            {generatorOptions}
          </div>
        )
      },
    ];

    return (
      <div className="relative">            
        {!loaded && (
          <div className="mt-12 text-2xl absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            Loading Modelina Playground. Please wait...
          </div>
        )}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 ${loaded ? '' : 'invisible'}`}>
          <div className="col-span-2 mb-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1 text-center">
                <div>
                  <div className="inline-flex items-center ml-6">
                    <Paragraph typeStyle="body-md" className="mr-2">
                      Select the desired language:
                    </Paragraph>
                    <Select
                      options={modelinaLanguageOptions}
                      selected={this.state.language}
                      onChange={this.setNewLanguageOptions}
                      className="shadow-outline-blue cursor-pointer"
                    />
                  </div>
                  <Paragraph typeStyle="body-sm" className="underline mt-2 hover:text-secondary-500 transition duration-300 ease">
                    <a href="https://github.com/asyncapi/modelina/issues/new?assignees=&labels=enhancement&template=enhancement.md" target="_blank" rel="noopener noreferrer">
                      Missing a language? Please let us know!
                    </a>
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-full">
              <Tabs tabs={tabs} className="h-full" />
            </div>
          </div>
          <div className="col-span-1">
            <CodeBlock
              language="javascript"
              textSizeClassName="text-sm"
              className="shadow-lg w-full"
              highlightClassName="h-half-screen"
              codeBlocks={this.state.codeblockModels === undefined || this.state.codeblockModels.length === 0 ? [{code: ''}] : this.state.codeblockModels}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default function ModelinaPlaygroundPage() {
  const [error, setError] = useState();
  const tryItOutRef = useRef(null);

  const description = 'Sometimes you just want to generate data models for your payload.';
  const image = '/img/social/modelina.png';

  const tabs = (
    <CodeBlock
      language="javascript"
      textSizeClassName="text-sm"
      className="shadow-lg w-full"
      highlightClassName="h-120"
      codeBlocks={[
        {
          language:'javascript',
          title: 'Generator code',
          code: exampleModelinaCode,
        },
        {
          language:'javascript',
          title: 'Output model',
          code: exampleOutputModel,
        },
      ]}
    />
  );

  const playground = (
    <div>
      <div className="relative pt-16 pb-8 hidden lg:block">
        <Heading level="h4" typeStyle="heading-md-semibold" className="text-center">
          Try it now
        </Heading>

        <ModelinaPlayground onError={setError} />
      </div>
      <Paragraph className="text-center block lg:hidden mt-8 max-w-3xl mx-auto">
        Modelina Playground works only on the desktop devices.
      </Paragraph>
    </div>
  );

  return (
    <GenericLayout
      title="Modelina"
      description={description}
      image={image}
      wide
    >
      <div className="py-16 overflow-hidden lg:py-24">
        <div className="relative text-center">
          <Heading level="h1" typeStyle="heading-lg">
            Modelina
          </Heading>
          <Paragraph className="mt-4 max-w-3xl mx-auto">
            {description}
          </Paragraph>
        </div>

        <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative mb-8 lg:mt-8">
            <Heading level="h4" typeStyle="heading-md-semibold">
                Installation & Usage
            </Heading>
            <Paragraph className="mt-3 lg:pr-4">
              Start using Modelina really quickly. Select one of the available languages we offer and start generating models from your AsyncAPI document in a few seconds.
            </Paragraph>
            <div className="mt-8">
              <CodeBlock language="bash" showLineNumbers={false} className="mt-8">npm install @asyncapi/modelina</CodeBlock>
              <div className="mt-8">
                <GithubButton
                  className="block mt-2 md:mt-0 md:inline-block w-full sm:w-auto mt-8"
                  href="https://www.github.com/asyncapi/modelina"
                />
                <Button 
                  className="hidden mt-2 md:mt-0 lg:inline-block md:ml-2" 
                  text="Try it now"
                  icon={<IconRocket className="inline-block -mt-1 w-6 h-6" />}
                  onClick={() => {
                    const element = tryItOutRef.current;
                    element && typeof element.scrollIntoView === 'function' && element.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="relative lg:mt-8">
            {tabs}
          </div>
        </div>

        <div ref={tryItOutRef}>
          {playground}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <strong className="font-bold mr-4">Error!</strong>
            <span className="block sm:inline">{typeof error.toString === 'function' ? error.toString() : error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-2">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => {setError(undefined)}}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}
      </div>
    </GenericLayout>
  )
}

const exampleModelinaCode = `import { JavaGenerator, JAVA_COMMON_PRESET } from '@asyncapi/modelina'
  
const generator = new JavaGenerator({
  collectionType: "List",
  presets: [
    {
      preset: JAVA_COMMON_PRESET,
      options: {
        classToString: true
      }
    }
  ]
});

// const input = ...AsyncAPI document
const models = await generator.generate(input)`;

const exampleOutputModel = `import java.util.List;
import java.util.Map;

public class LightMeasured {
  private Integer id;
  private Integer lumens;
  private java.time.OffsetDateTime sentAt;
  private Map<String, Object> additionalProperties;

  public Integer getId() { return this.id; }
  public void setId(Integer id) { this.id = id; }

  public Integer getLumens() { return this.lumens; }
  public void setLumens(Integer lumens) { this.lumens = lumens; }

  public java.time.OffsetDateTime getSentAt() { return this.sentAt; }
  public void setSentAt(java.time.OffsetDateTime sentAt) { this.sentAt = sentAt; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }

  @Override
  public String toString() {
    return "class LightMeasured {\\n" +   
      "    id: " + toIndentedString(id) + "\\n" +
      "    lumens: " + toIndentedString(lumens) + "\\n" +
      "    sentAt: " + toIndentedString(sentAt) + "\\n" +
      "    additionalProperties: " + toIndentedString(additionalProperties) + "\\n" +
    "}";
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\\n", "\\n    ");
  }
}`;

const playgroundAsyncAPIDocument = {
  "asyncapi": "2.2.0",
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
    },
    "turn/on": {
      "subscribe": {
        "summary": "Command a particular streetlight to turn the lights on or off.",
        "operationId": "turnOn",
        "message": {
          "name": "TurnOn",
          "payload": {
            "type": "object",
            "$id": "TurnOn",
            "properties": {
              "id": {
                "type": "integer",
                "minimum": 0,
                "description": "Id of the streetlight."
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