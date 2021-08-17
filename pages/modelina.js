import GenericWideLayout from '../components/layout/GenericWideLayout'
import { useState } from 'react'
import Select from '../components/form/Select'
import CodeBlock from '../components/editor/CodeBlock'
import modelinaOutputs from '../config/modelina-outputs.json'
import MonacoEditorWrapper from '../components/editor/MonacoEditorWrapper'
import {CommonNamingConventionImplementation, CSharpGenerator, GoGenerator, JavaGenerator, JavaScriptGenerator, JAVA_COMMON_PRESET, JAVA_CONSTRAINTS_PRESET, JAVA_DESCRIPTION_PRESET, JAVA_JACKSON_PRESET, TS_COMMON_PRESET, TypeScriptGenerator} from '@asyncapi/modelina'
import {parse} from '@asyncapi/parser'
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

export function CSharpOptions({onGeneratorChange}) {
  async function onNewSettings(){
    const generator = new CSharpGenerator();
    let jsCode = `const generator = new CSharpGenerator();`
    onGeneratorChange({generator, jsCode});
  }
  onNewSettings();

  return (
    <div className="relative max-w-full mt-8 mx-auto">
      <div className="mb-4">
      </div>
    </div>
  )
}
export function JavaScriptOptions({onGeneratorChange}) {
  async function onNewSettings(){
    const generator = new JavaScriptGenerator();
    let jsCode = `const generator = new JavaScriptGenerator();`
    onGeneratorChange({generator, jsCode});
  }
  onNewSettings();

  return (
    <div className="relative max-w-full mt-8 mx-auto">
      <div className="mb-4">
      </div>
    </div>
  )
}
export function GoOptions({onGeneratorChange}) {
  async function onNewSettings(){
    const generator = new GoGenerator();
    let jsCode = `const generator = new GoGenerator();`
    onGeneratorChange({generator, jsCode});
  }
  onNewSettings();

  return (
    <div className="relative max-w-full mt-8 mx-auto">
      <div className="mb-4">
      </div>
    </div>
  )
}

export function JavaOptions({onGeneratorChange}) {
  const [state, setState] = useState({equals: false, hashCode: false, classToString: false, includeConstraints: false, includeDescriptions: false, includeJackson: false})

  function onChangeEquals(event) {
    const newState = {...state, equals: event.target.checked};
    setState(newState)
    onNewSettings();
  }
  function onChangeHashCode(event) {
    const newState = {...state, hashCode: event.target.checked};
    setState(newState)
    onNewSettings();
  }
  function onChangeClassToString(event) {
    const newState = {...state, classToString: event.target.checked};
    setState(newState)
    onNewSettings();
  }
  function onChangeIncludeDescriptions(event) {
    const newState = {...state, includeDescriptions: event.target.checked};
    setState(newState)
    onNewSettings();
  }
  function onChangeIncludeConstraints(event) {
    const newState = {...state, includeConstraints: event.target.checked};
    setState(newState)
    onNewSettings();
  }
  function onChangeIncludeJackson(event) {
    const newState = {...state, includeJackson: event.target.checked};
    setState(newState)
    onNewSettings();
  }
  async function onNewSettings(){
    const jsPresetCode = [`{
  preset: JAVA_COMMON_PRESET,
  options: {
    equal: ${state.equals}, 
    hashCode: ${state.hashCode}, 
    classToString: ${state.classToString}
  }
}`]
    const presets = [{
      preset: JAVA_COMMON_PRESET,
      options: {
        equal: state.equals, 
        hashCode: state.hashCode, 
        classToString: state.classToString
      }
    }];
    if (state.includeConstraints === true) {
      presets.push({
        preset: JAVA_CONSTRAINTS_PRESET
      });
      jsPresetCode.push(`{ preset: JAVA_CONSTRAINTS_PRESET }`);
    }
    if (state.includeJackson === true) {
      presets.push({
        preset: JAVA_JACKSON_PRESET
      });
      jsPresetCode.push(`{ preset: JAVA_JACKSON_PRESET }`);
    }
    if (state.includeDescriptions === true) {
      presets.push({
        preset: JAVA_DESCRIPTION_PRESET
      });
      jsPresetCode.push(`{ preset: JAVA_DESCRIPTION_PRESET }`);
    }
    const generator = new JavaGenerator({presets});
    let jsCode = `const generator = new JavaGenerator({
presets: [
${jsPresetCode.join(',\n')}
]);`
    onGeneratorChange({generator, jsCode});
  }
  onNewSettings();

  return (
    <div className="relative max-w-full mt-8 mx-auto">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include equals functions</span>
            <input type="checkbox" className="form-checkbox" name="equals" checked={state.equals} onChange={onChangeEquals}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include hashCode functions</span>
            <input type="checkbox" className="form-checkbox" name="hashCode" checked={state.hashCode} onChange={onChangeHashCode}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include toString functions</span>
            <input type="checkbox" className="form-checkbox" name="classToString" checked={state.classToString} onChange={onChangeClassToString}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include descriptions</span>
            <input type="checkbox" className="form-checkbox" name="includeDescriptions" checked={state.includeDescriptions} onChange={onChangeIncludeDescriptions}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include constraints</span>
            <input type="checkbox" className="form-checkbox" name="includeConstraints" checked={state.includeConstraints} onChange={onChangeIncludeConstraints}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include Jackson annotation</span>
            <input type="checkbox" className="form-checkbox" name="includeJackson" checked={state.includeJackson} onChange={onChangeIncludeJackson}/>
          </label>
        </div>
      </div>
    </div>
  )
}

export function TypeScriptOptions({onGeneratorChange}) {
  const [state, setState] = useState({mashalling: false, variant: 'class'})

  function onChangeMarshalling(event) {
    const newState = {...state, mashalling: event.target.checked};
    setState(newState)
    onNewSettings();
  }
  function onChangeVariant(variant) {
    const newState = {...state, variant};
    setState(newState)
    onNewSettings();
  }
  function getRegularGenerator(){
    const generator = new TypeScriptGenerator({
      modelType: state.variant
    });
    let jsCode = `const generator = new TypeScriptGenerator({
  modelType: ${JSON.stringify(state.variant)}
});`
    return {generator, jsCode}
  }
  function getClassGenerator(){
    const generator = new TypeScriptGenerator({
      modelType: state.variant,
      presets: [
        {
          preset: TS_COMMON_PRESET,
          options: {
            marshalling: state.mashalling
          }
        }
      ]
    });
    let jsCode = `const generator = new TypeScriptGenerator({
  modelType: ${JSON.stringify(state.variant)},
  presets: [
    {
      preset: TS_COMMON_PRESET,
      options: {
        marshalling: ${JSON.stringify(state.mashalling)}
      }
    }
  ]
});`
    return {generator, jsCode}
  }
  async function onNewSettings(){
    let jsCode;
    let generator;
    if(state.variant === 'interface') {
      ({generator, jsCode} = getRegularGenerator())
    } else if(state.variant === 'class') {
      ({generator, jsCode} = getClassGenerator())
    }
    onGeneratorChange({generator, jsCode});
  }
  onNewSettings();

  return (
    <div className="relative max-w-full mt-8 mx-auto">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Output variant</span>
            <Select
              options={[{value: 'class', text: 'Class'}, {value: 'interface', text: 'Interface'}]}
              selected={'class'}
              onChange={onChangeVariant}
              className="shadow-outline-blue"
              />
          </label>
        </div>
        {
          state.variant === 'class' &&
          <div className="col-span-2">
            <label className="inline-flex items-center ml-6 col-span-2">
              <span className="text-sm text-gray-500 mr-2">Include un/marshal functions</span>
              <input type="checkbox" className="form-checkbox" name="marshalling" checked={state.mashalling} onChange={onChangeMarshalling}/>
            </label>
          </div>
        }
      </div>
    </div>
  )
}
export function ModelinaExample({ input, setError}) {
  const [language, setLanguage] = useState('typescript')
  const [model, setModel] = useState('')
  const [generatorCode, setGeneratorCode] = useState('')

  async function changeGenerator({generator, jsCode}) {
    try {
      const parsedInput = await parse(input, {path: './'}); 
      //generator.generate(input, {processorOptions: {asyncapi: {path: './'}}}).then((models) => {
      const models = await generator.generate(parsedInput);
      let dependencies = [];
      const modelCode = [];
      for (const model of models) {
        dependencies = [...dependencies, ...model.dependencies]
        modelCode.push(model.result);
      }
      const output = `${[...new Set(dependencies)].join('\n')}\n${modelCode.join('\n')}`
      setModel(output.trim())
      setGeneratorCode(`${jsCode}
//const input = AsyncAPI document
const models = await generator.generate(input);
for (const model of models) {
  // The model dependencies
  console.log(model.dependencies);
  // The model code
  console.log(model.result);
}`);
      setError(undefined);
    } catch(e) {
      setError(JSON.stringify(e));
    }
  }

  let outputOptions;
  if(language === 'typescript'){
    outputOptions = <TypeScriptOptions onGeneratorChange={changeGenerator}/>;
  } else if(language === 'java'){
    outputOptions = <JavaOptions onGeneratorChange={changeGenerator}/>;
  } else if(language === 'go'){
    outputOptions = <GoOptions onGeneratorChange={changeGenerator}/>;
  } else if(language === 'javascript'){
    outputOptions = <JavaScriptOptions onGeneratorChange={changeGenerator}/>;
  } else if(language === 'csharp'){
    outputOptions = <CSharpOptions onGeneratorChange={changeGenerator}/>;
  }
  return (
    <div className="relative max-w-full min-w-full mt-8 mx-auto">
      <div className="mb-4">
        <label className="inline-flex items-center ml-6">
          <span className="text-sm text-gray-500 mr-2">Select the desired output:</span>
          <Select
            options={modelinaOutputs}
            selected={language}
            onChange={setLanguage}
            className="shadow-outline-blue"
          />
          <span className="text-sm text-gray-400 mr-2 ml-5">Missing an output option? Please let us know!</span>
        </label>
        {outputOptions}
      </div>
      <div className="mb-4">
        <CodeBlock
          textSizeClassName="text-sm"
          className="shadow-lg h-full w-full"
          codeBlocks={[{
            language: language,
            title: 'Models',
            code: model
          }, {
            language:'js',
            title: 'Generator code',
            code: generatorCode
          }]}
          caption="See the generated models under the 'Models' tab, and the associated generator code used for generating the models under 'Generator code'"
        />
      </div>
    </div>
  )
}
export default function ModelinaPlaygroundPage() {
  const [input, setInput] = useState(JSON.stringify(defaultAsyncapiFile, null, 4))
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-12">
        <MonacoEditorWrapper
          value={input}
          onChange={(event, change) => {setInput(change)}}
          language="yaml"
        />
        <ModelinaExample input={input} setError={setError} />
      </div>
    </div>
  </GenericWideLayout>
  )
}
