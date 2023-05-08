import React from 'react';
import { TS_COMMON_PRESET, TypeScriptGenerator } from "@asyncapi/modelina"
import Select from "../form/Select"

export const defaultState = { marshalling: false, variant: 'class' }

export function getClassGenerator(marshalling) {
  const generator = new TypeScriptGenerator({
    modelType: 'class',
    presets: [
      {
        preset: TS_COMMON_PRESET,
        options: {
          marshalling: marshalling
        }
      }
    ]
  });

  const generateInstanceCode = `const generator = new TypeScriptGenerator({
  modelType: 'class',
  ${marshalling ? `presets: [
    {
      preset: TS_COMMON_PRESET,
      options: {
        marshalling: ${JSON.stringify(marshalling)}
      }
    }
  ]` : ''}
});`.replace(/^\s*\n/gm, '');

  const generatorCode = `import { TypeScriptGenerator, TS_COMMON_PRESET } from '@asyncapi/modelina';

${generateInstanceCode}`

  return { generator, generatorCode };
}

export function getRegularGenerator(variant) {
  const generator = new TypeScriptGenerator({
    modelType: variant
  });

  let generatorCode = `import { TypeScriptGenerator } from '@asyncapi/modelina';

const generator = new TypeScriptGenerator({
  modelType: ${JSON.stringify(variant)}
})`;

  return { generator, generatorCode }
}

export function getGeneratorCode(state = defaultState){
  if (state.variant === 'interface') {
    return getRegularGenerator(state.variant)
  }
  return getClassGenerator(state.marshalling)
}

export default class TypeScriptOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.onChangeMarshalling = this.onChangeMarshalling.bind(this)
    this.onChangeVariant = this.onChangeVariant.bind(this)
    this.onNewSettings = this.onNewSettings.bind(this)
    props.onInit(getGeneratorCode(this.state))
  }

  onChangeMarshalling(event) {
    const newState = {...this.state, marshalling: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onChangeVariant(variant) {
    const newState = {...this.state, variant}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  async onNewSettings(state) {
    this.props.onGeneratorChange(getGeneratorCode(state))
  }

  render() {
    return (
      <ul className="flex flex-col">
        <li>
          <label className="flex items-center py-2 justify-between cursor-pointer">
            <span className="text-sm mr-2">Output variant</span>
              <Select
                options={[{ value: 'class', text: 'Class' }, { value: 'interface', text: 'Interface' }]}
                selected={'class'}
                onChange={this.onChangeVariant}
                className="shadow-outline-blue cursor-pointer"
              />
          </label>
        </li>
        {this.state.variant === 'class' ? (
          <li>
            <label className="flex items-center py-2 justify-between cursor-pointer">
              <span className="text-sm mr-2">Include un/marshal functions</span>
              <input type="checkbox" className="form-checkbox cursor-pointer" name="marshalling" checked={this.state.mashalling} onChange={this.onChangeMarshalling} />
            </label>
          </li>
        ) : null}
      </ul>
    );
  }
}