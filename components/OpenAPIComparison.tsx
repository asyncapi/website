import React, { useState } from 'react';

interface HoverState {
  Info: boolean;
  Servers: boolean;
  Paths: boolean;
  PathItem: boolean;
  Summary: boolean;
  Operation: boolean;
  Message: boolean;
  Tags: boolean;
  External: boolean;
  Components: boolean;
}

interface OpenAPIComparisonProps {
  className?: string;
}

/**
 * @description React component for comparing OpenAPI 3.0 and AsyncAPI 2.0.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function OpenAPIComparison({ className = '' }: OpenAPIComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Info: false,
    Servers: false,
    Paths: false,
    PathItem: true,
    Summary: false,
    Operation: false,
    Message: false,
    Tags: false,
    External: false,
    Components: false
  });

  return (
    <div className={`${className} flex flex-wrap text-center`}>
      <div className='mr-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>OpenAPI 3.0</h3>
        <div>
          <div
            className={`${hoverState.Info ? 'bg-blue-100 ' : ' '}m-2 border border-blue-300 p-2`}
            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Info: true }))}
            onMouseLeave={() => setHoverState({ ...hoverState, Info: false })}
            data-testid='OpenAPI-sec-info'
          >
            Info
          </div>
          <div className='flex flex-1 flex-wrap'>
            <div
              className={`${hoverState.Servers ? 'bg-green-100' : ' '} m-2 flex-1 border border-green-300 p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Servers: true }))}
              onMouseLeave={() => setHoverState({ ...hoverState, Servers: false })}
              data-testid='OpenAPI-sec-servers'
            >
              Servers
            </div>
            <div className='border-bg-gray-500 m-2 flex-1 border p-2 hover:bg-gray-200'>Security</div>
          </div>
          <div
            className={`${hoverState.Paths ? 'bg-yellow-100' : ' '} m-2 border border-yellow-300 p-2`}
            onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Paths: true }))}
            onMouseLeave={() => setHoverState({ ...hoverState, Paths: false })}
            data-testid='OpenAPI-paths'
          >
            Paths
            <div className='flex flex-1 flex-wrap'>
              <div
                className={`${hoverState.PathItem ? 'bg-yellow-300' : 'bg-white'} m-2 border border-yellow-600 p-2`}
                onMouseEnter={() => {
                  return setHoverState((prevState) => ({ ...prevState, PathItem: true }));
                }}
                onMouseLeave={() => {
                  return setHoverState({ ...hoverState, PathItem: false });
                }}
                data-testid='OpenAPI-path-item'
              >
                Path Item
                <div className='flex flex-1 flex-col flex-wrap'>
                  <div
                    className={`${hoverState.Summary ? 'bg-blue-200' : 'bg-white'} m-2 border border-blue-500 p-2`}
                    onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Summary: true }))}
                    onMouseLeave={() => {
                      return setHoverState({ ...hoverState, Summary: false });
                    }}
                    data-testid='OpenAPI-summary'
                  >
                    Summary and description
                  </div>
                  <div className='flex flex-1 flex-wrap'>
                    <div
                      className={`${hoverState.Operation ? 'bg-orange-100' : 'bg-white'} m-2 flex-1 border border-orange-300 p-2`}
                      onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Operation: true }))}
                      onMouseLeave={() => setHoverState({ ...hoverState, Operation: false })}
                      data-testid='OpenAPI-operation'
                    >
                      Operation (GET, PUT, POST, etc.)
                      <div className='flex flex-1 flex-wrap'>
                        <div
                          className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                          onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Message: true }))}
                          onMouseLeave={() => setHoverState({ ...hoverState, Message: false })}
                          data-testid='OpenAPI-request'
                        >
                          Request
                        </div>
                        <div
                          className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                          onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Message: true }))}
                          onMouseLeave={() => setHoverState({ ...hoverState, Message: false })}
                          data-testid='OpenAPI-responses'
                        >
                          Responses
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-1 flex-wrap'>
            <div
              className={`${hoverState.Tags ? 'bg-pink-300' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Tags: true }))}
              onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Tags: false }))}
              data-testid='OpenAPI-tags'
            >
              <p>Tags</p>
            </div>
            <div
              className={`${hoverState.External ? 'bg-green-500' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, External: true }))}
              onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, External: false }))}
              data-testid='OpenAPI-external'
            >
              <p>External Docs</p>
            </div>
          </div>
          <div
            className={`${hoverState.Components ? 'bg-gray-100' : ' '} m-2 flex-1 border border-black p-2`}
            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Components: true }))}
            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Components: false }))}
            data-testid='OpenAPI-components'
          >
            Components
            <div className='grid-gap-2 mt-1 grid flex-1 grid-cols-2'>
              <div className='m-2 border border-black bg-gray-100 p-2'>Schemas</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Responses</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Parameters</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Examples</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Request Bodies</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Headers</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Security Schemes</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Links</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Callbacks</div>
            </div>
          </div>
        </div>
      </div>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 2.0</h3>
        <div>
          <div
            className={`${hoverState.Info ? 'bg-blue-100 ' : ' '}m-2 border border-blue-300 p-2`}
            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Info: true }))}
            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Info: false }))}
          >
            Info
          </div>
          <div className='flex flex-1 flex-wrap'>
            <div
              className={`${hoverState.Servers ? 'bg-green-100' : ' '} m-2 flex-1 border border-green-300 p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Servers: true }))}
              onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Servers: false }))}
            >
              Servers (hosts + security)
            </div>
          </div>
          <div
            className={`${hoverState.Paths ? 'bg-yellow-100' : ' '} m-2 border border-yellow-300 p-2`}
            onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Paths: true }))}
            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Paths: false }))}
          >
            Channel
            <div className='flex flex-1 flex-wrap'>
              <div
                className={`${hoverState.PathItem ? 'bg-yellow-300' : 'bg-white'} m-2 border border-yellow-600 p-2`}
                onMouseOver={() => setHoverState((prevState) => ({ ...prevState, PathItem: true }))}
                onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, PathItem: false }))}
              >
                Channel Item
                <div className='flex flex-1 flex-wrap'>
                  <div className='flex flex-1 flex-wrap'>
                    <div
                      className={`${hoverState.Operation ? 'bg-orange-100' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                      onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Operation: true }))}
                      onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Operation: false }))}
                    >
                      Operation (Publish and Subscribe)
                      <div className='flex flex-1 flex-col flex-wrap'>
                        <div
                          className={`${hoverState.Summary ? 'bg-blue-200' : 'bg-white'} m-2 border border-blue-500 p-2`}
                          onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Summary: true }))}
                          onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Summary: false }))}
                        >
                          Summary, description, tags, etc.
                        </div>
                        <div className='flex flex-1 flex-wrap'>
                          <div
                            className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                            onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Message: true }))}
                            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Message: false }))}
                          >
                            Message
                            <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>Headers</div>
                            <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>Payload</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-1 flex-wrap'>
            <div className='m-2 box-border flex-1 border border-black p-2 hover:bg-blue-400'>
              Id (application identifier)
            </div>
          </div>
          <div className='flex flex-1 flex-wrap'>
            <div
              className={`${hoverState.Tags ? 'bg-pink-300' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Tags: true }))}
              onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Tags: false }))}
            >
              <p>Tags</p>
            </div>
            <div
              className={`${hoverState.External ? 'bg-green-500' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, External: true }))}
              onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, External: false }))}
            >
              <p>External Docs</p>
            </div>
          </div>
          <div
            className={`${hoverState.Components ? 'bg-gray-100' : ' '} m-2 flex-1 border border-black p-2`}
            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Components: true }))}
            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Components: false }))}
          >
            Components
            <div className='grid-gap-2 mt-2 grid flex-1 grid-cols-2 flex-wrap'>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Schemas</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Messages</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Security Schemes</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Parameters</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Correlation Ids</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Operation Traits</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Message Traits</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Server Bindings</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Channel Bindings</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Operation Bindings</div>
              <div className='m-2 box-border border border-black bg-gray-100 p-2'>Message Bindings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
