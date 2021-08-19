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
  })
  let generatorCode = `const generator = new TypeScriptGenerator({
  modelType: 'class',
  presets: [
    {
      preset: TS_COMMON_PRESET,
      options: {
        marshalling: ${JSON.stringify(marshalling)}
      }
    }
  ]
})`
  return { generator, generatorCode }
}

export function getRegularGenerator(variant) {
  const generator = new TypeScriptGenerator({
    modelType: variant
  })
  let generatorCode = `const generator = new TypeScriptGenerator({
  modelType: ${JSON.stringify(variant)}
})`
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
      <div className="relative max-w-full mt-8 mx-auto">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <label className="inline-flex items-center ml-6 col-span-2">
              <span className="text-sm text-gray-500 mr-2">Output variant</span>
              <Select
                options={[{ value: 'class', text: 'Class' }, { value: 'interface', text: 'Interface' }]}
                selected={'class'}
                onChange={this.onChangeVariant}
                className="shadow-outline-blue"
              />
            </label>
          </div>
          {
            this.state.variant === 'class' &&
            <div className="col-span-2">
              <label className="inline-flex items-center ml-6 col-span-2">
                <span className="text-sm text-gray-500 mr-2">Include un/marshal functions</span>
                <input type="checkbox" className="form-checkbox" name="marshalling" checked={this.state.mashalling} onChange={this.onChangeMarshalling} />
              </label>
            </div>
          }
        </div>
      </div>
    )
  }
}