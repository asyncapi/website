import React from 'react';
import { CSharpGenerator, CSHARP_COMMON_PRESET, CSHARP_JSON_SERIALIZER_PRESET } from "@asyncapi/modelina";

export const defaultState = {serialization: false, getHashCode: false, equals: false}

export function getClassGenerator(state){
  const imports = ['CSharpGenerator']
  const jsPresetCode = [];
  const presets = [];
  
  if (state.equals === true || state.getHashCode === true) {
    presets.push({
      preset: CSHARP_COMMON_PRESET,
      options: {
        equal: state.equals, 
        hashCode: state.getHashCode
      },
    });
    imports.push('CSHARP_COMMON_PRESET');
    jsPresetCode.push(`    {
      preset: CSHARP_COMMON_PRESET,
      options: {
        ${state.equals ? 'equals: true,' : ''}
        ${state.getHashCode ? 'hashCode: true,' : ''}
      }
    }`.replace(/^\s*\n/gm, ''));
  }
  if (state.serialization === true) {
    presets.push({
      preset: CSHARP_JSON_SERIALIZER_PRESET
    });
    imports.push('CSHARP_JSON_SERIALIZER_PRESET');
    jsPresetCode.push('    CSHARP_JSON_SERIALIZER_PRESET'.replace(/^\s*\n/gm, ''));
  }

  const generator = new CSharpGenerator({
    presets: presets
  });
  const generatorCode = `import { ${imports.join(', ')} } from '@asyncapi/modelina';
  
const generator = new CSharpGenerator(${presets.length ? `{
  presets: [
${jsPresetCode.join(',\n')}
  ]
}`: ''})`;

  return { generator, generatorCode };
}

export function getGeneratorCode(state = defaultState){
  return getClassGenerator(state)
}

export default class CSharpOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.onChangeEquals = this.onChangeEquals.bind(this)
    this.onChangeGetHashCode = this.onChangeGetHashCode.bind(this)
    this.onChangeSerialization = this.onChangeSerialization.bind(this)
    this.onNewSettings = this.onNewSettings.bind(this)
    props.onInit(getGeneratorCode(this.state))
  }

  onChangeEquals(event) {
    const newState = {...this.state, equals: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onChangeGetHashCode(event) {
    const newState = {...this.state, getHashCode: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onChangeSerialization(event) {
    const newState = {...this.state, serialization: event.target.checked}
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
            <span className="text-sm mr-2">Include Equals method</span>
            <input type="checkbox" className="form-checkbox cursor-pointer" name="equals" checked={this.state.equals} onChange={this.onChangeEquals} />
          </label>
        </li>
        <li>
          <label className="flex items-center py-2 justify-between cursor-pointer">
            <span className="text-sm mr-2">Include GetHashCode methods</span>
            <input type="checkbox" className="form-checkbox cursor-pointer" name="getHashCode" checked={this.state.hashCode} onChange={this.onChangeGetHashCode} />
          </label>
        </li>
        <li>
          <label className="flex items-center py-2 justify-between cursor-pointer">
            <span className="text-sm mr-2">Include de/serialization methods</span>
            <input type="checkbox" className="form-checkbox cursor-pointer" name="serialization" checked={this.state.serialization} onChange={this.onChangeSerialization} />
          </label>
        </li>
      </ul>
    );
  }
}
