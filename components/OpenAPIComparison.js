import React, { useState } from 'react';

export default function OpenAPIComparison({ className = '' }) {
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
        Components: false
    });

    return (
        <div className={`${className} flex flex-wrap text-center`}>
            <div className="flex-1 border border-black p-2 mr-1">
                <h3 className="text-lg font-sans font-medium mb-4 ml-2">OpenAPI 3.0</h3>

                <div>
                    <div className={(hoverState.Info ? `bg-blue-100 ` : ` `) + `border border-blue-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Info: true }))} onMouseLeave={() => setHoverState({ ...hoverState, Info: false })}>
                        Info
                    </div>
                    <div className="flex flex-wrap flex-1">
                        <div className={(hoverState.Servers ? `bg-green-100` : ' ') + ' flex-1 border border-green-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Servers: true }))} onMouseLeave={() => setHoverState({ ...hoverState, Servers: false })}>
                            Servers
                        </div>
                        <div className="flex-1 hover:bg-gray-200 border border-bg-gray-500 p-2 m-2">
                            Security
                        </div>
                    </div>
                    <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ ...hoverState, Paths: false })}>
                        Paths
                        <div className="flex flex-wrap flex-1">
                            <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseEnter={() => { return setHoverState(prevState => ({ ...prevState, PathItem: true })) }} onMouseLeave={() => { return setHoverState({ ...hoverState, PathItem: false }) }}>
                                Path Item

                                <div className="flex flex-col flex-wrap flex-1">
                                    <div className={(hoverState.Summary ? 'bg-blue-200' : 'bg-white') + ` border border-blue-500 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Summary: true }))} onMouseLeave={() => { return setHoverState({ ...hoverState, Summary: false }) }}>
                                        Summary and description
                                    </div>
                                    <div className="flex flex-wrap flex-1">
                                        <div className={(hoverState.Operation ? `bg-orange-100` : 'bg-white') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Operation: true }))} onMouseLeave={() => setHoverState({ ...hoverState, Operation: false })}>
                                            Operation (GET, PUT, POST, etc.)

                                            <div className="flex flex-wrap flex-1">
                                                <div className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Message: true }))} onMouseLeave={() => setHoverState({ ...hoverState, Message: false })}>
                                                    Request
                                                </div>
                                                <div className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Message: true }))} onMouseLeave={() => setHoverState({ ...hoverState, Message: false })}>
                                                    Responses
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-1">
                        <div className={(hoverState.Tags ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Tags: true }))} onMouseLeave={() => setHoverState({ Tags: false })}>
                            <p>Tags</p>
                        </div>
                        <div className={(hoverState.External ? `bg-green-500` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, External: true }))} onMouseLeave={() => setHoverState({ External: false })}>
                            <p>External Docs</p>
                        </div>
                    </div>
                    <div className={(hoverState.Components ? `bg-gray-100` : ' ') + ` flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Components: true }))} onMouseLeave={() => setHoverState({ Components: false })}>
                        Components

                        <div className="grid grid-cols-2 grid-gap-2 flex-1 mt-1">
                            <div className="bg-gray-100 border border-black p-2 m-2">
                                Definitions
                            </div>
                            <div className="bg-gray-100 border border-black p-2 m-2">
                                Responses
                            </div>
                            <div className="bg-gray-100 border border-black p-2 m-2">
                                Parameters
                            </div>
                            <div className="bg-gray-100 border border-black p-2 m-2">
                                Response Headers
                            </div>
                            <div className="bg-gray-100 border border-black p-2 m-2">
                                Security Definitions
                            </div>
                            <div className="bg-gray-100 border border-black p-2 m-2">
                                Callbacks
                            </div>
                            <div className="bg-gray-100 border border-black p-2 m-2">
                                Links
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 border border-black p-2 ml-1">
                <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.0</h3>

                <div>
                    <div className={(hoverState.Info ? `bg-blue-100 ` : ' ') + 'border border-blue-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Info: true }))} onMouseLeave={() => setHoverState({ Info: false })}>
                        Info
                    </div>
                    <div className="flex flex-wrap flex-1">
                        <div className={(hoverState.Servers ? `bg-green-100` : ' ') + ' flex-1 border border-green-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Servers: true }))} onMouseLeave={() => setHoverState({ Servers: false })}>
                            Servers (hosts + security)
                        </div>
                    </div>
                    <div className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Paths: true }))} onMouseLeave={() => setHoverState({ Paths: false })}>
                        Channel

                        <div className="flex flex-wrap flex-1">
                            <div className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, PathItem: true }))} onMouseLeave={() => setHoverState({ PathItem: false })}>
                                Channel Item

                                <div className="flex flex-wrap flex-1">
                                    <div className="flex flex-wrap flex-1">
                                        <div className={(hoverState.Operation ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Operation: true }))} onMouseLeave={() => setHoverState({ Operation: false })}>
                                            Operation (Publish and Subscribe)

                                            <div className="flex flex-col flex-wrap flex-1">
                                                <div className={(hoverState.Summary ? 'bg-blue-200' : 'bg-white') + ` border border-blue-500 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Summary: true }))} onMouseLeave={() => setHoverState({ Summary: false })} >
                                                    Summary, description, tags, etc.
                                                </div>
                                                <div className="flex flex-wrap flex-1">
                                                    <div className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`} onMouseEnter={() => setHoverState(prevState => ({ ...prevState, Message: true }))} onMouseLeave={() => setHoverState({ Message: false })}>
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
                    <div className="flex flex-wrap flex-1">
                        <div className="flex-1 border border-black box-border hover:bg-blue-400 p-2 m-2">
                            Id (application identifier)
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-1">
                        <div className={(hoverState.Tags ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Tags: true }))} onMouseLeave={() => setHoverState({ Tags: false })}>
                            <p>Tags</p>
                        </div>
                        <div className={(hoverState.External ? `bg-green-500` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, External: true }))} onMouseLeave={() => setHoverState({ External: false })}>
                            <p>External Docs</p>
                        </div>
                    </div>
                    <div className={(hoverState.Components ? `bg-gray-100` : ' ') + ` flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Components: true }))} onMouseLeave={() => setHoverState({ Components: false })}>
                        Components

                        <div className="grid grid-cols-2 grid-gap-2 flex-wrap flex-1 mt-2">
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Schemas
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Messages
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Security Schemes
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Parameters
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Correlation Ids
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Operation Traits
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Message Traits
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Server Bindings
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Channel Bindings
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Operation Bindings
                            </div>
                            <div className="bg-gray-100 border border-black box-border p-2 m-2">
                                Message Bindings
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
