import React from 'react';
import { JavaScriptGenerator } from "@asyncapi/modelina";

export const defaultState = {}

export function getClassGenerator(){
  const generator = new JavaScriptGenerator();

  const generatorCode = `import { JavaScriptGenerator } from '@asyncapi/modelina';

const generator = new JavaScriptGenerator()`;

  return { generator, generatorCode };
}

export function getGeneratorCode(state = defaultState){
  return getClassGenerator(state)
}

export default class JavaScriptOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    props.onInit(getGeneratorCode(this.state))
  }

  render() {
    return (
      <div className="relative max-w-full mx-auto">
        <div className="pt-4 text-center">
          No available options
        </div>
      </div>
    );
  }
}
