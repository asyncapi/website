import { GoGenerator } from "@asyncapi/modelina"
export const defaultState = {}

export function getClassGenerator(){
  const generator = new GoGenerator()
  let generatorCode = `const generator = new GoGenerator()`
  return {generator, generatorCode}
}

export function getGeneratorCode(state = defaultState){
  return getClassGenerator(state)
}

export default class GoOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    props.onInit(getGeneratorCode(this.state))
  }

  render() {
    return (
      <div className="relative max-w-full mt-8 mx-auto">
        <div className="mb-4">
        </div>
      </div>
    )
  }
}
