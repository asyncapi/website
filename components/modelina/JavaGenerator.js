import { JavaGenerator, JAVA_COMMON_PRESET, JAVA_CONSTRAINTS_PRESET, JAVA_DESCRIPTION_PRESET, JAVA_JACKSON_PRESET } from "@asyncapi/modelina"
import Select from "../form/Select"
export const defaultState = {equals: false, hashCode: false, classToString: false, includeConstraints: false, includeDescriptions: false, includeJackson: false, collectionType: 'List'}
export const javaCollectionTypes = [
  { 
    "value": "List", 
    "text": "List" 
  },
  { 
    "value": "Array", 
    "text": "Array"
  }
]
export function getClassGenerator(state){
    const jsPresetCode = [` {
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
    }]
    if (state.includeConstraints === true) {
      presets.push({
        preset: JAVA_CONSTRAINTS_PRESET
      })
      jsPresetCode.push(`    { preset: JAVA_CONSTRAINTS_PRESET }`)
    }
    if (state.includeJackson === true) {
      presets.push({
        preset: JAVA_JACKSON_PRESET
      })
      jsPresetCode.push(`    { preset: JAVA_JACKSON_PRESET }`)
    }
    if (state.includeDescriptions === true) {
      presets.push({
        preset: JAVA_DESCRIPTION_PRESET
      })
      jsPresetCode.push(`    { preset: JAVA_DESCRIPTION_PRESET }`)
    }
    const generator = new JavaGenerator({collectionType: state.collectionType, presets})
    const generatorCode = `const generator = new JavaGenerator({
  collectionType: ${JSON.stringify(state.collectionType)},
  presets: [
  ${jsPresetCode.join(',\n')}
  ]
})`
    return {generator, generatorCode}
}
export function getGeneratorCode(state = defaultState){
  return getClassGenerator(state)
}

export default class JavaOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.onChangeEquals = this.onChangeEquals.bind(this)
    this.onChangeHashCode = this.onChangeHashCode.bind(this)
    this.onChangeClassToString = this.onChangeClassToString.bind(this)
    this.onChangeIncludeDescriptions = this.onChangeIncludeDescriptions.bind(this)
    this.onChangeIncludeConstraints = this.onChangeIncludeConstraints.bind(this)
    this.onChangeIncludeJackson = this.onChangeIncludeJackson.bind(this)
    this.setNewCollectionType = this.setNewCollectionType.bind(this)
    this.onNewSettings = this.onNewSettings.bind(this)
    props.onInit(getGeneratorCode(this.state))
  }

  onChangeEquals(event) {
    const newState = {...this.state, equals: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onChangeHashCode(event) {
    const newState = {...this.state, hashCode: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onChangeClassToString(event) {
    const newState = {...this.state, classToString: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onChangeIncludeDescriptions(event) {
    const newState = {...this.state, includeDescriptions: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onChangeIncludeConstraints(event) {
    const newState = {...this.state, includeConstraints: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onChangeIncludeJackson(event) {
    const newState = {...this.state, includeJackson: event.target.checked}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  setNewCollectionType(selectedCollectionType) {
    const newState = {...this.state, collectionType: selectedCollectionType}
    this.setState(newState)
    this.onNewSettings(newState)
  }
  onNewSettings(state) {
    this.props.onGeneratorChange(getGeneratorCode(state))
  }
  onNewGeneralSettings(state) {
    this.props.onGeneratorChange(getGeneratorCode(state))
  }

  render() {
    return (
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include equals functions</span>
            <input type="checkbox" className="form-checkbox" name="equals" checked={this.state.equals} onChange={this.onChangeEquals}/>
          </label>
        </div>
        <div className="col-span-3">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Collection type</span>
            <Select
              options={javaCollectionTypes}
              selected={this.state.collectionType}
              onChange={this.setNewCollectionType}
              className="shadow-outline-blue" />
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include hashCode functions</span>
            <input type="checkbox" className="form-checkbox" name="hashCode" checked={this.state.hashCode} onChange={this.onChangeHashCode}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include toString functions</span>
            <input type="checkbox" className="form-checkbox" name="classToString" checked={this.state.classToString} onChange={this.onChangeClassToString}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include descriptions</span>
            <input type="checkbox" className="form-checkbox" name="includeDescriptions" checked={this.state.includeDescriptions} onChange={this.onChangeIncludeDescriptions}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include constraints</span>
            <input type="checkbox" className="form-checkbox" name="includeConstraints" checked={this.state.includeConstraints} onChange={this.onChangeIncludeConstraints}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include Jackson annotation</span>
            <input type="checkbox" className="form-checkbox" name="includeJackson" checked={this.state.includeJackson} onChange={this.onChangeIncludeJackson}/>
          </label>
        </div>
        <div className="col-span-2">
          <label className="inline-flex items-center ml-6 col-span-2">
            <span className="text-sm text-gray-500 mr-2">Include equals functions</span>
            <input type="checkbox" className="form-checkbox" name="equals" checked={this.state.equals} onChange={this.onChangeEquals}/>
          </label>
        </div>
      </div>
    )
  }
}