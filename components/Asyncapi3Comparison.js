import React, { useState } from 'react';

/**
 * Main comparison that shows the full picture between v2 and v3
 */
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
    Id: false,
    Path: false,
    Host: false
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
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
          <div className="border border-blue-300 p-2 m-2">
            Servers
            <div className="flex flex-col flex-wrap flex-1">
              <div className="border border-blue-600 p-2 m-2">
                Server
                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Host || hoverState.Path ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Host: true, Path: true }))} onMouseLeave={() => setHoverState({ Host: false, Path: false })}>
                    <p>Url</p>
                  </div>
                </div>
              </div>
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
          <div className="border border-blue-300 p-2 m-2">
            Servers
            <div className="flex flex-col flex-wrap flex-1">
              <div className="border border-blue-600 p-2 m-2">
                Server
                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Host ? `bg-pink-300` : ' ') + ` flex-1 border border-black box-border mr-1 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Host: true }))} onMouseLeave={() => setHoverState({ Host: false })}>
                    <p>Host</p>
                  </div>
                  <div className={(hoverState.Path ? `bg-pink-300` : ' ') + ` flex-1 border border-black box-border mr-1 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Path: true }))} onMouseLeave={() => setHoverState({ Path: false })}>
                    <p>Pathname</p>
                  </div>
                </div>
              </div>
            </div>
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

/**
 * Used to compare how channels, operations and messages have changed
 */
export function Asyncapi3ChannelComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Paths: false,
    PathItem: false,
    Operation: false,
    Message: false,
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
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
                  <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2" >
                    channel
                  </div>
                  <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2" >
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

/**
 * Shows the comparison between v2 and v3 for the channel IDs and channel address
 */
export function Asyncapi3IdAndAddressComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Paths: false,
    PathItem: false,
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
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

/**
 * Compares how the server object changes from v2 to v3.
 */
export function Asyncapi3ServerComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Host: false,
    path: false,
    Servers: false,
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className="border border-blue-300 p-2 m-2">
            Servers
            <div className="flex flex-col flex-wrap flex-1">
              <div className="border border-blue-600 p-2 m-2">
                Server
                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Host || hoverState.Path ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Host: true, Path: true }))} onMouseLeave={() => setHoverState({ Host: false, Path: false })}>
                    <p>Url</p>
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
          <div className="border border-blue-300 p-2 m-2">
            Servers
            <div className="flex flex-col flex-wrap flex-1">
              <div className="border border-blue-600 p-2 m-2">
                Server
                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Host ? `bg-pink-300` : ' ') + ` flex-1 border border-black box-border mr-1 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Host: true }))} onMouseLeave={() => setHoverState({ Host: false })}>
                    <p>Host</p>
                  </div>
                  <div className={(hoverState.Path ? `bg-pink-300` : ' ') + ` flex-1 border border-black box-border mr-1 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Path: true }))} onMouseLeave={() => setHoverState({ Path: false })}>
                    <p>Pathname</p>
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

/**
 * Compare how the meta data moved place between v2 and v3
 */
export function Asyncapi3MetaComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    Info: false,
    Tags: false,
    External: false
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
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

/**
 * Compares how operations changed from v2 to v3
 */
export function Asyncapi3OperationComparison({ className = '' }) {
  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className="border border-yellow-300 p-2 m-2">
            Channels

            <div className="flex flex-wrap flex-1">
              <div className="border border-yellow-600 p-2 m-2">
                Channel Item

                <div className="flex flex-wrap flex-1">
                  <div className="flex-1 border border-orange-300 p-2 m-2">
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
          <div className="border border-yellow-300 p-2 m-2">
            Operations
            <div className="flex flex-wrap flex-1">
              <div className="flex-1 border border-orange-300 p-2 m-2">
                Operation

                <div className="flex flex-col flex-wrap flex-1">
                  <div className="border border-blue-500 bg-white p-2 m-2">
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

/**
 * Compares how the schema and schemaFormat changed location from v2 to v3
 */
export function Asyncapi3SchemaFormatComparison({ className = '' }) {
  const [hoverState, setHoverState] = useState({
    SchemaFormat: false,
    Payload: false
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={'border border-yellow-300 p-2 m-2'}>
            components | channels

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
            components | channels

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
