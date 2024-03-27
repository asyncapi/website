import React, { useState } from 'react';

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

/**
 * @description OpenAPIComparisonV3 component displays a comparison between OpenAPI 3.0 and AsyncAPI 3.0 specifications.
 * @param {string} [props.className=''] - Additional CSS classes for styling
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
    <div className={`${className} flex flex-wrap text-center`}>
      <div className='mr-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>OpenAPI 3.0</h3>
        <div>
          <div
            className={`${hoverState.Info ? 'bg-blue-100 ' : ' '}m-2 border border-blue-300 p-2`}
            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Info: true }))}
            onMouseLeave={() => setHoverState({ ...hoverState, Info: false })}
          >
            Info
          </div>
          <div className='flex flex-1 flex-wrap'>
            <div
              className={`${hoverState.Servers ? 'bg-green-100' : ' '} m-2 flex-1 border border-green-300 p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Servers: true }))}
              onMouseLeave={() => setHoverState({ ...hoverState, Servers: false })}
            >
              Servers
            </div>
            <div className='border-bg-gray-500 m-2 flex-1 border p-2 hover:bg-gray-200'>Security</div>
          </div>
          <div
            className={`${hoverState.Paths ? 'bg-yellow-100' : ' '} m-2 border border-yellow-300 p-2`}
            onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Paths: true }))}
            onMouseLeave={() => setHoverState({ ...hoverState, Paths: false })}
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
              >
                Path Item
                <div className='flex flex-1 flex-col flex-wrap'>
                  <div
                    className={`${hoverState.Summary ? 'bg-blue-200' : 'bg-white'} m-2 border border-blue-500 p-2`}
                    onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Summary: true }))}
                    onMouseLeave={() => {
                      return setHoverState({ ...hoverState, Summary: false });
                    }}
                  >
                    Summary and description
                  </div>
                  <div className='flex flex-1 flex-wrap'>
                    <div
                      className={`${hoverState.OperationItem ? 'bg-orange-300' : 'bg-white'} m-2 flex-1 border border-orange-300 p-2`}
                      onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, OperationItem: true }))}
                      onMouseLeave={() => setHoverState({ ...hoverState, OperationItem: false })}
                    >
                      Operation
                      <div
                        className={`${hoverState.OperationType ? 'bg-orange-400' : 'bg-white'} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, OperationType: true }))}
                        onMouseLeave={() => setHoverState({ ...hoverState, OperationType: false })}
                      >
                        GET, PUT, POST, etc.
                      </div>
                      <div
                        className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                        onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Message: true }))}
                        onMouseLeave={() => setHoverState({ ...hoverState, Message: false })}
                      >
                        Request
                      </div>
                      <div
                        className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                        onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Message: true }))}
                        onMouseLeave={() => setHoverState({ ...hoverState, Message: false })}
                      >
                        Responses
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
            <div className='grid-gap-2 mt-1 grid flex-1 grid-cols-2'>
              <div className='m-2 border border-black bg-gray-100 p-2'>Definitions</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Responses</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Parameters</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Response Headers</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Security Definitions</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Callbacks</div>
              <div className='m-2 border border-black bg-gray-100 p-2'>Links</div>
            </div>
          </div>
        </div>
      </div>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 3.0</h3>
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
            Channels
            <div className='flex flex-1 flex-wrap'>
              <div
                className={`${hoverState.PathItem ? 'bg-yellow-300' : 'bg-white'} m-2 border border-yellow-600 p-2`}
                onMouseOver={() => setHoverState((prevState) => ({ ...prevState, PathItem: true }))}
                onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, PathItem: false }))}
              >
                Channel
                <div className='flex flex-1 flex-wrap'>
                  <div className='flex flex-1 flex-wrap'>
                    <div
                      className={`${hoverState.Summary ? 'bg-blue-200' : 'bg-white'} m-2 border border-blue-500 p-2`}
                      onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Summary: true }))}
                      onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Summary: false }))}
                    >
                      Summary, description
                    </div>
                    <div className='flex flex-1 flex-wrap'>
                      <div
                        className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                        onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Message: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Message: false }))}
                      >
                        Messages
                        <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>Headers</div>
                        <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>Payload</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${hoverState.Operations ? 'bg-orange-200' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Operations: true }))}
            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Operations: false }))}
          >
            Operations
            <div className='flex flex-1 flex-wrap'>
              <div
                className={`${hoverState.OperationItem ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                onMouseOver={() => setHoverState((prevState) => ({ ...prevState, OperationItem: true }))}
                onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, OperationItem: false }))}
              >
                Operation
                <div className='flex flex-1 flex-col flex-wrap'>
                  <div
                    className={`${hoverState.OperationType ? 'bg-orange-400' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                    onMouseOver={() => setHoverState((prevState) => ({ ...prevState, OperationType: true }))}
                    onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, OperationType: false }))}
                  >
                    action (send or receive)
                  </div>
                  <div
                    className={`${hoverState.PathItem ? 'bg-yellow-300' : 'bg-white'} m-2 border border-yellow-600 p-2`}
                    onMouseEnter={() => {
                      return setHoverState((prevState) => ({ ...prevState, PathItem: true }));
                    }}
                    onMouseLeave={() => {
                      return setHoverState({ ...hoverState, PathItem: false });
                    }}
                  >
                    Channel reference
                  </div>
                  <div
                    className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                    onMouseEnter={() => setHoverState((prevState) => ({ ...prevState, Message: true }))}
                    onMouseLeave={() => setHoverState({ ...hoverState, Message: false })}
                  >
                    Messages reference
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
