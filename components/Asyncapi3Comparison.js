import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
export function Asyncapi3Comparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Info: false,
    Servers: false,
    Paths: false,
    PathItem: true,
    Summary: false,
    Operation: false,
    Message: false,
    Tags: false,
    External: false,
    Components: false,
    Id: false
  });

  return (
    <div className={`${className} flex flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={(hoverState.Info ? `bg-blue-100 ` : ' ') + 'border border-blue-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Info: true }))} onMouseLeave={() => setHoverState({ Info: false })}>
            Info
          </div>
          <div className="flex flex-wrap flex-1">
            <div className={(hoverState.Tags ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Tags: true }))} onMouseLeave={() => setHoverState({ Tags: false })}>
              <p>Tags</p>
            </div>
            <div className={(hoverState.External ? `bg-green-500` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, External: true }))} onMouseLeave={() => setHoverState({ External: false })}>
              <p>External Docs</p>
            </div>
          </div>
          <div className="flex flex-wrap flex-1">
            <div className={(hoverState.Servers ? `bg-green-100` : ' ') + ' flex-1 border border-green-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Servers: true }))} onMouseLeave={() => setHoverState({ Servers: false })}>
              Servers (hosts + security)
            </div>
          </div>
          <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ Paths: false })}>
            Channels

            <div className="flex flex-wrap flex-1">
              <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, PathItem: true }))} onMouseLeave={() => setHoverState({ PathItem: false })}>
                Channel Item

                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Operation ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Operation: true }))} onMouseLeave={() => setHoverState({ Operation: false })}>
                    Operation (Publish and Subscribe)

                    <div className="flex flex-col flex-wrap flex-1">
                      <div className="flex flex-wrap flex-1">
                        <div className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Message: true }))} onMouseLeave={() => setHoverState({ Message: false })}>
                          Messages
                          <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                            Message

                            <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                              Headers
                            </div>
                            <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                              Payload
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={(hoverState.Info ? `bg-blue-100 ` : ' ') + 'border border-blue-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Info: true }))} onMouseLeave={() => setHoverState({ Info: false })}>
            Info
            <div className="flex flex-wrap flex-1">
              <div className={(hoverState.Tags ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Tags: true }))} onMouseLeave={() => setHoverState({ Tags: false })}>
                <p>Tags</p>
              </div>
              <div className={(hoverState.External ? `bg-green-500` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, External: true }))} onMouseLeave={() => setHoverState({ External: false })}>
                <p>External Docs</p>
              </div>
            </div>
          </div>
          <div className={(hoverState.Servers ? `bg-green-100` : ' ') + ' flex-1 border border-green-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Servers: true }))} onMouseLeave={() => setHoverState({ Servers: false })}>
            Servers (hosts + security)
          </div>
          <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ Paths: false })}>
            Channels

            <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, PathItem: true }))} onMouseLeave={() => setHoverState({ PathItem: false })}>
              Channel Item
              <div className="flex flex-col flex-wrap flex-1">
                <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                  address
                </div>
                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Message: true }))} onMouseLeave={() => setHoverState({ Message: false })}>
                    Messages
                    <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                      Message

                      <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                        Headers
                      </div>
                      <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                        Payload
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={(hoverState.Operation ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Operation: true }))} onMouseLeave={() => setHoverState({ Operation: false })}>
            Operations
            <div className="flex flex-wrap flex-1">
              <div className="flex-1 border border-orange-300 p-2 m-2">
                Operation

                <div className="flex flex-col flex-wrap flex-1">
                  <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                    action (send or receive)
                  </div>
                  <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                    channel
                  </div>
                  <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                    messages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

// eslint-disable-next-line react/prop-types
export function Asyncapi3ChannelComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Info: false,
    Servers: false,
    Paths: false,
    PathItem: true,
    Summary: false,
    Operation: false,
    Message: false,
    Tags: false,
    External: false,
    Components: false,
    Id: false
  });

  return (
    <div className={`${className} flex flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ Paths: false })}>
            Channels

            <div className="flex flex-wrap flex-1">
              <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, PathItem: true }))} onMouseLeave={() => setHoverState({ PathItem: false })}>
                Channel Item

                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Operation ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Operation: true }))} onMouseLeave={() => setHoverState({ Operation: false })}>
                    Operation (Publish and Subscribe)

                    <div className="flex flex-col flex-wrap flex-1">
                      <div className="flex flex-wrap flex-1">
                        <div className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Message: true }))} onMouseLeave={() => setHoverState({ Message: false })}>
                          Messages
                          <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                            Message

                            <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                              Headers
                            </div>
                            <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                              Payload
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ Paths: false })}>
            Channels

            <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, PathItem: true }))} onMouseLeave={() => setHoverState({ PathItem: false })}>
              Channel Item
              <div className="flex flex-col flex-wrap flex-1">
                <div className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Message: true }))} onMouseLeave={() => setHoverState({ Message: false })}>
                  Messages
                  <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                    Message

                    <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                      Headers
                    </div>
                    <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                      Payload
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={(hoverState.Operation ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Operation: true }))} onMouseLeave={() => setHoverState({ Operation: false })}>
            Operations
            <div className="flex flex-wrap flex-1">
              <div className="flex-1 border border-orange-300 p-2 m-2">
                Operation
                <div className="flex flex-col flex-wrap flex-1">
                  <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2" >
                    action (send or receive)
                  </div>
                  <div className={(hoverState.Summary ? 'bg-blue-200' : 'bg-white') + ` border border-blue-500 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Summary: true }))} onMouseLeave={() => setHoverState({ Summary: false })} >
                    channel
                  </div>
                  <div className={(hoverState.Summary ? 'bg-blue-200' : 'bg-white') + ` border border-blue-500 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Summary: true }))} onMouseLeave={() => setHoverState({ Summary: false })} >
                    messages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

// eslint-disable-next-line react/prop-types
export function Asyncapi3IdAndAddressComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Info: false,
    Servers: false,
    Paths: false,
    PathItem: true,
    Summary: false,
    Operation: false,
    Message: false,
    Tags: false,
    External: false,
    Components: false,
    Id: false
  });

  return (
    <div className={`${className} flex flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ Paths: false })}>
            Channels
            <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, PathItem: true }))} onMouseLeave={() => setHoverState({ PathItem: false })}>
              Channel Item
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ Paths: false })}>
            Channels

            <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, PathItem: true }))} onMouseLeave={() => setHoverState({ PathItem: false })}>
              Channel Item

              <div className="flex flex-col flex-wrap flex-1">
                <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                  address
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export function Asyncapi3MetaComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Info: false,
    Servers: false,
    Paths: false,
    PathItem: true,
    Summary: false,
    Operation: false,
    Message: false,
    Tags: false,
    External: false,
    Components: false,
    Id: false
  });

  return (
    <div className={`${className} flex flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={(hoverState.Info ? `bg-blue-100 ` : ' ') + 'border border-blue-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Info: true }))} onMouseLeave={() => setHoverState({ Info: false })}>
            Info
          </div>
          <div className="flex flex-wrap flex-1">
            <div className={(hoverState.Tags ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Tags: true }))} onMouseLeave={() => setHoverState({ Tags: false })}>
              <p>Tags</p>
            </div>
            <div className={(hoverState.External ? `bg-green-500` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, External: true }))} onMouseLeave={() => setHoverState({ External: false })}>
              <p>External Docs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={(hoverState.Info ? `bg-blue-100 ` : ' ') + 'border border-blue-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Info: true }))} onMouseLeave={() => setHoverState({ Info: false })}>
            Info
            <div className="flex flex-wrap flex-1">
              <div className={(hoverState.Tags ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Tags: true }))} onMouseLeave={() => setHoverState({ Tags: false })}>
                <p>Tags</p>
              </div>
              <div className={(hoverState.External ? `bg-green-500` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, External: true }))} onMouseLeave={() => setHoverState({ External: false })}>
                <p>External Docs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}


// eslint-disable-next-line react/prop-types
export function Asyncapi3OperationComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Info: false,
    Servers: false,
    Paths: false,
    PathItem: true,
    Summary: false,
    Operation: false,
    Message: false,
    Tags: false,
    External: false,
    Components: false,
    Id: false
  });

  return (
    <div className={`${className} flex flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ Paths: false })}>
            Channels

            <div className="flex flex-wrap flex-1">
              <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, PathItem: true }))} onMouseLeave={() => setHoverState({ PathItem: false })}>
                Channel Item

                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Operation ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Operation: true }))} onMouseLeave={() => setHoverState({ Operation: false })}>
                    Operation (Publish and Subscribe)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={(hoverState.Operation ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Operation: true }))} onMouseLeave={() => setHoverState({ Operation: false })}>
            Operations
            <div className="flex flex-wrap flex-1">
              <div className="flex-1 border border-orange-300 p-2 m-2">
                Operation

                <div className="flex flex-col flex-wrap flex-1">
                  <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                    action (send or receive)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}


// eslint-disable-next-line react/prop-types
export function Asyncapi3SchemaFormatComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Info: false,
    Servers: false,
    Paths: false,
    PathItem: true,
    Summary: false,
    Operation: false,
    Message: false,
    Tags: false,
    External: false,
    Components: false,
    Id: false
  });

  return (
    <div className={`${className} flex flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={'border border-yellow-300 p-2 m-2'}>
            components

            <div className="flex flex-wrap flex-1">
              <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                messages

                <div className="flex flex-wrap flex-1">
                  <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                    message
                    <div className="flex flex-wrap flex-1">
                      <div className={(hoverState.SchemaFormat ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, SchemaFormat: true }))} onMouseLeave={() => setHoverState({ SchemaFormat: false })}>
                      schemaFormat
                      </div>

                      <div className={(hoverState.Payload ? `bg-yellow-300` : 'bg-white') + ` flex-1 border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Payload: true }))} onMouseLeave={() => setHoverState({ Payload: false })}>
                        payload
                        <div className="flex flex-wrap flex-1">
                          <div className={'bg-white flex-1 border border-orange-300 p-2 m-2'}>
                          schema
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={'border border-yellow-300 p-2 m-2'}>
            components

            <div className="flex flex-wrap flex-1">
              <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                messages

                <div className="flex flex-wrap flex-1">
                  <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                    message
                    <div className="flex flex-wrap flex-1">
                      <div className={(hoverState.Payload ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Payload: true }))} onMouseLeave={() => setHoverState({ Payload: false })}>
                        payload

                        <div className="flex flex-wrap flex-1">
                          <div className={(hoverState.SchemaFormat ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, SchemaFormat: true }))} onMouseLeave={() => setHoverState({ SchemaFormat: false })}>
                          schemaFormat
                          </div>
                          <div className={'bg-white flex-1 border border-orange-300 p-2 m-2'}>
                          schema
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
