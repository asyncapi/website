import React, { useState } from 'react';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import generatorflagList from '../config/generator-flags.json';
import generatorTemplates from '../config/generator-templates.json';
import CodeBlock from './editor/CodeBlock';
import Select from './form/Select';
import Paragraph from './typography/Paragraph';

interface GeneratorFlagData {
  flag: string;
  specPath: string;
}

interface GeneratorFlags {
  [key: string]: GeneratorFlagData;
}

/**
 * @description This component displays generator installation options.
 */
export default function GeneratorInstallation() {
  const [template, setTemplate] = useState<string>('@asyncapi/html-template');
  // By default we will have output folder flag so its set here.
  const [params, setParams] = useState<string>('-o example');
  const [specPath, setSpecPath] = useState<string>('https://bit.ly/asyncapi');

  const generatorflags = generatorflagList as GeneratorFlags;

  /**
   * @description Handles the change event when selecting a generator template.
   * @param {string} templateName - The name of the selected template.
   */
  function onChangeTemplate(templateName: string) {
    setTemplate(templateName);
    if (templateName && generatorflags[templateName]) {
      const templateBasedJSON = generatorflags[templateName];

      // options are generated from generator-templates.json
      // and flags are fetched from generator-flags.json,
      // so it is mandatory to have check in case if any misses the option in future

      if (templateBasedJSON) {
        setParams(templateBasedJSON.flag);
        setSpecPath(templateBasedJSON.specPath);
      }
    }
  }

  /**
   * @description Generates the npm install command.
   * @returns {string} The npm install command.
   */
  function getNpmCode(): string {
    return `npm install -g @asyncapi/cli
asyncapi generate fromTemplate ${specPath} ${template} ${params}`;
  }

  /**
   * Generates the Docker command.
   * @returns {string} The Docker command.
   */
  function getDockerCode(): string {
    return `docker run --rm -it --user=root -v \${PWD}/example:/app/example -v \${PWD}/output:/app/output \\
asyncapi/cli generate fromTemplate ${specPath} ${template} ${params}`;
  }

  return (
    <div className='relative mx-auto mt-8 max-w-full'>
      <div className='mb-4'>
        <Paragraph typeStyle={ParagraphTypeStyle.md} className='mr-4 inline'>
          Select a Generator template:
        </Paragraph>
        <Select
          options={generatorTemplates}
          selected={template}
          onChange={onChangeTemplate}
          className='shadow-outline-blue'
        />
      </div>
      <CodeBlock
        language='generator-cli'
        textSizeClassName='text-sm'
        className='shadow-lg'
        codeBlocks={[
          {
            language: 'npm',
            code: getNpmCode()
          },
          {
            language: 'Docker',
            code: getDockerCode()
          }
        ]}
      />
    </div>
  );
}
