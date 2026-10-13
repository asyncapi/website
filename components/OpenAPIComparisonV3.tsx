import React, { useState } from 'react';

import { Column, ComparisonBox, HoverBox } from './ComparisonCommon';
import {
  AsyncAPIServersSection,
  OpenAPIServersSection,
  SpecComponentsSection,
  SpecInfoSection,
  TagsAndExternalDocsSection
} from './OpenAPIComparisonCommon';

interface HoverState {
  Info: boolean;
  Servers: boolean;
  Paths: boolean;
  PathItem: boolean;
  Summary: boolean;
  Operations: boolean;
  OperationItem: boolean;
  OperationType: boolean;
  Message: boolean;
  Tags: boolean;
  External: boolean;
  Components: boolean;
}

interface OpenAPIComparisonV3Props {
  className?: string;
}

/** Component entries shown inside the OpenAPI 3.0 Components section (V3 comparison). */
const OPENAPI_V3_COMPONENT_NAMES = [
  'Definitions',
  'Responses',
  'Parameters',
  'Response Headers',
  'Security Definitions',
  'Callbacks',
  'Links'
];

/** Component entries shown inside the AsyncAPI 3.0 Components section. */
const ASYNCAPI_V3_COMPONENT_NAMES = [
  'Schemas',
  'Messages',
  'Security Schemes',
  'Parameters',
  'Correlation Ids',
  'Operation Traits',
  'Message Traits',
  'Server Bindings',
  'Channel Bindings',
  'Operation Bindings',
  'Message Bindings'
];

/**
 * @description OpenAPIComparisonV3 component displays a comparison between OpenAPI 3.0 and AsyncAPI 3.0 specifications.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function OpenAPIComparisonV3({ className = '' }: OpenAPIComparisonV3Props) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Info: false,
    Servers: false,
    Paths: false,
    PathItem: true,
    Summary: false,
    Operations: false,
    OperationItem: true,
    OperationType: false,
    Message: false,
    Tags: false,
    External: false,
    Components: false
  });

  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <Column title='OpenAPI 3.0'>
        <SpecInfoSection hoverState={hoverState} setHoverState={setHoverState} />
        <OpenAPIServersSection hoverState={hoverState} setHoverState={setHoverState} />
        <HoverBox<HoverState>
          label='Paths'
          fieldKey='Paths'
          hoverState={hoverState}
          setHoverState={setHoverState}
          activeClass='bg-yellow-100 dark:bg-yellow-900/40'
          defaultClass=''
          borderClass='border-yellow-300 dark:border-yellow-700'
        >
          <div className='flex flex-1 flex-wrap'>
            <HoverBox<HoverState>
              label='Path Item'
              fieldKey='PathItem'
              hoverState={hoverState}
              setHoverState={setHoverState}
              activeClass='bg-yellow-300 dark:bg-yellow-800/60'
              borderClass='border-yellow-600 dark:border-yellow-700'
            >
              <div className='flex flex-1 flex-col flex-wrap'>
                <HoverBox<HoverState>
                  label='Summary and description'
                  fieldKey='Summary'
                  hoverState={hoverState}
                  setHoverState={setHoverState}
                  activeClass='bg-blue-200 dark:bg-blue-900/50'
                  borderClass='border-blue-500 dark:border-blue-400'
                />
                <div className='flex flex-1 flex-wrap'>
                  <HoverBox<HoverState>
                    label='Operation'
                    fieldKey='OperationItem'
                    hoverState={hoverState}
                    setHoverState={setHoverState}
                    activeClass='bg-orange-300 dark:bg-orange-800/60'
                    borderClass='border-orange-300 dark:border-orange-700'
                    className='flex-1'
                  >
                    <HoverBox<HoverState>
                      label='GET, PUT, POST, etc.'
                      fieldKey='OperationType'
                      hoverState={hoverState}
                      setHoverState={setHoverState}
                      activeClass='bg-orange-400 dark:bg-orange-900/70'
                      borderClass='border-orange-300 dark:border-orange-700'
                      className='flex-1'
                    />
                    <HoverBox<HoverState>
                      label='Request'
                      fieldKey='Message'
                      hoverState={hoverState}
                      setHoverState={setHoverState}
                      activeClass='bg-red-400 dark:bg-red-900/60'
                      borderClass='border-red-600 dark:border-red-700'
                      className='flex-1'
                    />
                    <HoverBox<HoverState>
                      label='Responses'
                      fieldKey='Message'
                      hoverState={hoverState}
                      setHoverState={setHoverState}
                      activeClass='bg-red-400 dark:bg-red-900/60'
                      borderClass='border-red-600 dark:border-red-700'
                      className='flex-1'
                    />
                  </HoverBox>
                </div>
              </div>
            </HoverBox>
          </div>
        </HoverBox>
        <TagsAndExternalDocsSection hoverState={hoverState} setHoverState={setHoverState} />
        <SpecComponentsSection
          hoverState={hoverState}
          setHoverState={setHoverState}
          componentNames={OPENAPI_V3_COMPONENT_NAMES}
        />
      </Column>

      <Column title='AsyncAPI 3.0'>
        <SpecInfoSection hoverState={hoverState} setHoverState={setHoverState} />
        <AsyncAPIServersSection hoverState={hoverState} setHoverState={setHoverState} />
        <HoverBox<HoverState>
          label='Channels'
          fieldKey='Paths'
          hoverState={hoverState}
          setHoverState={setHoverState}
          activeClass='bg-yellow-100 dark:bg-yellow-900/40'
          defaultClass=''
          borderClass='border-yellow-300 dark:border-yellow-700'
        >
          <div className='flex flex-1 flex-wrap'>
            <HoverBox<HoverState>
              label='Channel'
              fieldKey='PathItem'
              hoverState={hoverState}
              setHoverState={setHoverState}
              activeClass='bg-yellow-300 dark:bg-yellow-800/60'
              borderClass='border-yellow-600 dark:border-yellow-700'
              useMouseOver
            >
              <div className='flex flex-1 flex-wrap'>
                <div className='flex flex-1 flex-wrap'>
                  <HoverBox<HoverState>
                    label='Summary, description'
                    fieldKey='Summary'
                    hoverState={hoverState}
                    setHoverState={setHoverState}
                    activeClass='bg-blue-200 dark:bg-blue-900/50'
                    borderClass='border-blue-500 dark:border-blue-400'
                    useMouseOver
                  />
                  <div className='flex flex-1 flex-wrap'>
                    <HoverBox<HoverState>
                      label='Messages'
                      fieldKey='Message'
                      hoverState={hoverState}
                      setHoverState={setHoverState}
                      activeClass='bg-red-400 dark:bg-red-900/60'
                      borderClass='border-red-600 dark:border-red-700'
                      className='flex-1'
                    >
                      <ComparisonBox className='box-border flex-1'>Headers</ComparisonBox>
                      <ComparisonBox className='box-border flex-1'>Payload</ComparisonBox>
                    </HoverBox>
                  </div>
                </div>
              </div>
            </HoverBox>
          </div>
        </HoverBox>
        <HoverBox<HoverState>
          label='Operations'
          fieldKey='Operations'
          hoverState={hoverState}
          setHoverState={setHoverState}
          activeClass='bg-orange-200 dark:bg-orange-900/50'
          borderClass='border-orange-300 dark:border-orange-700'
          className='flex-1'
          useMouseOver
        >
          <div className='flex flex-1 flex-wrap'>
            <HoverBox<HoverState>
              label='Operation'
              fieldKey='OperationItem'
              hoverState={hoverState}
              setHoverState={setHoverState}
              activeClass='bg-orange-300 dark:bg-orange-800/60'
              borderClass='border-orange-300 dark:border-orange-700'
              className='flex-1'
              useMouseOver
            >
              <div className='flex flex-1 flex-col flex-wrap'>
                <HoverBox<HoverState>
                  label='action (send or receive)'
                  fieldKey='OperationType'
                  hoverState={hoverState}
                  setHoverState={setHoverState}
                  activeClass='bg-orange-400 dark:bg-orange-900/70'
                  borderClass='border-orange-300 dark:border-orange-700'
                  className='flex-1'
                  useMouseOver
                />
                <HoverBox<HoverState>
                  label='Channel reference'
                  fieldKey='PathItem'
                  hoverState={hoverState}
                  setHoverState={setHoverState}
                  activeClass='bg-yellow-300 dark:bg-yellow-800/60'
                  borderClass='border-yellow-600 dark:border-yellow-700'
                />
                <HoverBox<HoverState>
                  label='Messages reference'
                  fieldKey='Message'
                  hoverState={hoverState}
                  setHoverState={setHoverState}
                  activeClass='bg-red-400 dark:bg-red-900/60'
                  borderClass='border-red-600 dark:border-red-700'
                  className='flex-1'
                />
              </div>
            </HoverBox>
          </div>
        </HoverBox>
        <div className='flex flex-1 flex-wrap'>
          <ComparisonBox className='box-border flex-1 hover:bg-blue-400 dark:hover:bg-blue-900/50'>
            Id (application identifier)
          </ComparisonBox>
        </div>
        <TagsAndExternalDocsSection hoverState={hoverState} setHoverState={setHoverState} />
        <SpecComponentsSection
          hoverState={hoverState}
          setHoverState={setHoverState}
          componentNames={ASYNCAPI_V3_COMPONENT_NAMES}
        />
      </Column>
    </div>
  );
}
