export default function OpenAPIComparison({ className = '' }) {
  return (
      <div className={`${className} flex flex-wrap text-center`}>
        <div className="flex-1 border border-black p-2 mr-1">
          <h3 className="text-lg font-sans font-medium mb-4 ml-2">OpenAPI 3.0</h3>
  
          <div>
              <div className="bg-blue-100 border border-black p-2 m-2">
                Info
              </div>
              <div className="flex flex-wrap flex-1">
                <div className="flex-1 bg-green-100 border border-black p-2 m-2">
                  Hosts
                </div>
                <div className="flex-1 bg-gray-200 border border-black p-2 m-2">
                  Security
                </div>
              </div>
              <div className="bg-yellow-100 border border-black p-2 m-2">
                  Paths
                  <div className="flex flex-wrap flex-1">
                      <div className="bg-yellow-300 flex-1 border border-black p-2 m-2">
                          Path Item

                          <div className="flex flex-col flex-wrap flex-1">
                              <div className="bg-blue-200 border border-black p-2 m-2">
                                  Summary and description
                              </div>
                              <div className="flex flex-wrap flex-1">
                                  <div className="bg-orange-100 flex-1 border border-black p-2 m-2">
                                      Operation (GET, PUT, POST, etc.)

                                      <div className="flex flex-wrap flex-1">
                                          <div className="bg-red-400 flex-1 border border-black p-2 m-2">
                                              Request
                                          </div>
                                          <div className="bg-red-400 flex-1 border border-black p-2 m-2">
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
                  <div className="bg-pink-300 flex-1 border border-black p-2 m-2">
                      Tags
                  </div>
                  <div className="bg-green-500 flex-1 border border-black p-2 m-2">
                      External Docs
                  </div>
              </div>
              <div className="bg-gray-100 flex-1 border border-black p-2 m-2">
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
                <div className="bg-blue-100 border border-black p-2 m-2">
                    Info
                </div>
                <div className="flex flex-wrap flex-1">
                    <div className="bg-green-100 flex-1 border border-black p-2 m-2">
                        Servers (hosts + security)
                    </div>
                </div>
                <div className="bg-yellow-100 border border-black p-2 m-2">
                    Channel
                
                    <div className="flex flex-wrap flex-1">
                        <div className="bg-yellow-300 flex-1 border border-black p-2 m-2">
                            Channel Item
                
                            <div className="flex flex-wrap flex-1">
                                <div className="flex flex-wrap flex-1">
                                    <div className="bg-orange-100 flex-1 border border-black p-2 m-2">
                                        Operation (Publish and Subscribe)
                
                                        <div className="flex flex-col flex-wrap flex-1">
                                            <div className="bg-blue-200 border border-black p-2 m-2">
                                                Summary, description, tags, etc.
                                            </div>
                                            <div className="flex flex-wrap flex-1">
                                                <div className="bg-red-400 flex-1 border border-black p-2 m-2">
                                                    Message

                                                    <div className="flex-1 border border-black box-border mr-1 bg-red-100 p-2 m-2">
                                                        Headers
                                                    </div>
                                                    <div className="flex-1 border border-black box-border mr-1 bg-red-100 p-2 m-2">
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
                    <div className="flex-1 border border-black box-border bg-blue-400 p-2 m-2">
                        Id (application identifier)
                    </div>
                </div>
                <div className="flex flex-wrap flex-1">
                    <div className="bg-pink-300 flex-1 border border-black box-border p-2 m-2">
                        Tags
                    </div>
                    <div className="bg-green-500 flex-1 border border-black box-border p-2 m-2">
                        External Docs
                    </div>
                </div>
                <div className="bg-gray-100 border border-black p-2 m-2">
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
    </div>
  )
}