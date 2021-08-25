import React from 'react';
import { GoGenerator } from "@asyncapi/modelina";

export const defaultState = {}

export function getClassGenerator(){
  const generator = new GoGenerator();

  const generatorCode = `import { GoGenerator } from '@asyncapi/modelina';

const generator = new GoGenerator()`;

  return { generator, generatorCode };
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
      <div className="relative max-w-full mx-auto">
        <div className="pt-4 text-center">
          No available options
        </div>
      </div>
    );
  }
}
