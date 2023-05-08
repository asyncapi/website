import { useState, useEffect } from 'react'
import Typing from 'react-typing-animation'
import MacWindow from './MacWindow'
import ArrowRight from './icons/ArrowRight'
import OpenInStudioButton from './buttons/OpenInStudioButton'
import Heading from './typography/Heading'

export default function DemoAnimation({ className = '' }) {
  const [started, setStarted] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [showChannelsAndOperation, setShowChannelsAndOperation] = useState(false)
  const [showUntilMessagePayload, setShowUntilMessagePayload] = useState(false)
  const [showDisplayName, setShowDisplayName] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [showDisplayNameDescription, setShowDisplayNameDescription] = useState(false)
  const [showEmailDescription, setShowEmailDescription] = useState(false)
  const [finished, setFinished] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const typingSpeed = 60

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        setShowControls(true)
      }, 2000)
    }
  }, [finished])

  function transitionClassNames(condition) {
    return `transition-all duration-500 ease-in-out overflow-hidden ${condition ? 'opacity-100 max-h-auto' : 'max-h-0 opacity-0'}`
  }

  function renderTyping(children, callback) {
    return (
      <Typing speed={typingSpeed} cursor={<Cursor />} onFinishedTyping={callback}>
        {children}
      </Typing>
    )
  }

  function renderInfoBlock(callback) {
    const descriptionCallback = () => setFinished(true)

    const common = (
      <>
        <div>
          <span className="text-teal-400">asyncapi:</span> 2.6.0
        </div>
        <div>
          <span className="text-teal-400">info:</span>
        </div>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;title:</span> Account Service
        </div>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;version:</span> 1.0.0
        </div>
        <Typing.Delay ms={500} />
      </>
    )

    if (showEmailDescription) {
      return (
        <>
          {common}
          <Typing speed={typingSpeed} cursor={<Cursor />} onFinishedTyping={descriptionCallback}>
            <div>
              <span className="text-teal-400">&nbsp;&nbsp;description:</span> This service is in charge of processing user signups :rocket:
            </div>
          </Typing>
        </>
      )
    }

    return renderTyping(
      common,
      callback
    )
  }

  function renderChannelsOperationBlock(callback) {
    return renderTyping(
      <>
        <div>
          <span className="text-teal-400">channels:</span>
        </div>
        <div>
          <span className="text-yellow-300">&nbsp;&nbsp;user/signedup:</span>
        </div>
        <div>
          <span className="text-purple-400">&nbsp;&nbsp;&nbsp;&nbsp;subscribe:</span>
        </div>
        <Typing.Delay ms={500} />
      </>,
      callback
    )
  }

  function renderUntilMessagePayload(callback) {
    return renderTyping(
      <>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:</span>
        </div>
        <div>
          <span className="text-teal-200">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ref:</span><span className="text-teal-200"> '#/components/messages/UserSignedUp'</span>
        </div>
        <div>
          <span className="text-teal-400">components:</span>
        </div>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;messages:</span>
        </div>
        <div>
          <span className="text-teal-200">&nbsp;&nbsp;&nbsp;&nbsp;UserSignedUp:</span>
        </div>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payload:</span>
        </div>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:</span><span> object</span>
        </div>
      </>,
      callback
    )
  }

  function renderDisplayName(callback) {
    const descriptionCallback = () => setShowDisplayNameDescription(true)

    const common = (
      <>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties:</span>
        </div>
        <div>
          <span className="text-green-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;displayName:</span>
        </div>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:</span><span> string</span>
        </div>
      </>
    )

    if (showEmail) {
      return (
        <>
          { common }
          <Typing speed={typingSpeed} cursor={<Cursor />} onFinishedTyping={descriptionCallback}>
            <div>
              <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description:</span><span> Name of the user</span>
            </div>
          </Typing>
        </>
      )
    }

    return renderTyping(
      <>
        { common }
      </>,
      callback
    )
  }

  function renderEmail(callback) {
    const descriptionCallback = () => setShowEmailDescription(true)

    const common = (
      <>
        <div>
          <span className="text-green-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:</span>
        </div>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:</span><span> string</span>
        </div>
        <div>
          <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:</span><span> email</span>
        </div>
      </>
    )

    if (showDisplayNameDescription) {
      return (
        <>
          {common}
          <Typing speed={typingSpeed} cursor={<Cursor />} onFinishedTyping={descriptionCallback}>
            <div>
              <span className="text-teal-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description:</span><span> Email of the user</span>
            </div>
          </Typing>
        </>
      )
    }

    return renderTyping(
      common,
      callback
    )
  }

  return (
    <div className={`${className} relative`}>
      <div className="md:flex transition-all duration-500 ease-in-out" style={showControls ? { filter: '', opacity: '1' } : null }>
        <div className="mb-2 z-20 md:flex-1 md:mr-1 md:mb-0">
          <MacWindow
            className="bg-code-editor-dark h-full border-gray-800 border shadow-lg transition-all duration-500 ease-in-out"
            contentClassName="text-left text-white text-sm font-mono font-medium transition-all duration-500 ease-in-out break-words md:min-h-108"
            title="asyncapi.yaml"
          >
            { (showEmailDescription || started) && renderInfoBlock(() => setShowInfo(true)) }
            { showInfo && renderChannelsOperationBlock(() => setShowChannelsAndOperation(true)) }
            { showChannelsAndOperation && renderUntilMessagePayload(() => setShowUntilMessagePayload(true)) }
            { (showUntilMessagePayload || showEmail) && renderDisplayName(() => setShowDisplayName(true)) }
            { (showDisplayName || showDisplayNameDescription) && renderEmail(() => setShowEmail(true)) }
          </MacWindow>
        </div>
        <div className={`relative md:flex-1 md:ml-6 md:mb-0 transition-all duration-500 ease-in-out z-10`}>
          <div className={`md:text-left text-center mt-8 md:mt-0 lg:absolute lg:left-0 lg:top-0 lg:right-0 lg:ml-48 lg:mr-8 ${showControls ? 'block' : 'hidden'}`}>
            <Heading
              typeStyle="heading-md"
              level="h3"
              className="mb-4"
            >
              Play with it!
            </Heading>
            <p className="text-gray-700 text-lg font-normal tracking mb-6 max-w-3xl mx-auto mb-8">
              Open this example on AsyncAPI Studio to get a better taste of the specification. No signup is required!
            </p>
            <OpenInStudioButton />
          </div>
          <MacWindow
            className={`bg-gray-50 border-gray-200 border shadow-lg min-h-full transition-all duration-500 ease-in-out ${showControls ? 'transform -translate-x-full h-0 opacity-0 lg:h-auto lg:opacity-100 lg:-translate-x-3/4' : ''}`}
            contentClassName="text-left h-full text-gray-800 text-sm font-medium transition-all duration-500 ease-in-out"
            title="Account Service Documentation"
          >
            <div className={`mb-8 mt-4 ${transitionClassNames(showInfo)}`}>
              <h1 className="text-2xl font-bold text-gray-500">Account Service 1.0.0</h1>
              <p className={transitionClassNames(finished)}>
                This service is in charge of processing user signups 🚀
              </p>
            </div>

            <div className={transitionClassNames(showChannelsAndOperation)}>
              <span className="px-3 py-2 mr-2 bg-green-500 text-white font-bold rounded">SUB</span> <span className="text-lg text-gray-700">user/signedup</span>
            </div>

            <div className={transitionClassNames(showUntilMessagePayload)}>
              <div className="mt-4 mb-2 text-gray-400">Accepts the following message:</div>
              <div className="px-4 py-4 bg-gray-200 text-gray-600 rounded">
                Payload <ArrowRight className={`inline-block w-4 h-4 transition-all duration-500 ease-in-out ${showDisplayName ? 'rotate-90 transform' : ''}`} /> <span className="ml-24 text-green-500 font-bold">Object</span>
                <div>
                  <div className="px-4 py-4 mt-2 bg-gray-100 rounded">
                    <div className={`grid grid-cols-2 mb-4 ${transitionClassNames(showDisplayName)}`}>
                      <div>displayName</div>
                      <div>
                        <div className="text-green-500 font-bold">String</div>
                        <div className={`text-sm ${transitionClassNames(showDisplayNameDescription)}`}>Name of the user</div>
                      </div>
                    </div>
                    <div className={`grid grid-cols-2 ${transitionClassNames(showEmail)}`}>
                      <div>email</div>
                      <div>
                        <div className="text-green-500 font-bold">
                          String
                          <span className="text-xs bg-yellow-300 ml-2 px-1 py-0.5 text-black rounded">email</span>
                        </div>
                        <div className={`text-sm ${transitionClassNames(showEmailDescription)}`}>Email of the user</div>
                      </div>
                    </div>

                    <div className="mt-8 text-xs text-gray-400">Additional properties are allowed.</div>
                  </div>

                  <div className="mt-4 p-4 font-mono bg-code-editor-dark text-gray-400 rounded">
                    <div className="text-gray-500">// Example</div>
                    <div>&nbsp;</div>
                    <div>{'{'}</div>
                    <div className={transitionClassNames(showDisplayName)}>
                      <span className="text-teal-400">&nbsp;&nbsp;"displayName"</span>: <span className="text-white">"Eve & Chan"</span>,
                    </div>
                    <div className={transitionClassNames(showEmail)}>
                      <span className="text-teal-400">&nbsp;&nbsp;"email"</span>: <span className="text-white">"info@asyncapi.io"</span>
                    </div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>
          </MacWindow>
        </div>
      </div>
    </div>
  )
}

function Cursor({ className = '' }) {
  return (
    <span className={`${className} animation-blink animation-1s animation-step-end bg-gray-400 font-bold px-px ml-px`}></span>
  )
}
