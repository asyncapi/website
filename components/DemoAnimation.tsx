import React, { useEffect, useState } from 'react';
import Typing from 'react-typist-component';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import OpenInStudioButton from './buttons/OpenInStudioButton';
import ArrowRight from './icons/ArrowRight';
import MacWindow from './MacWindow';
import Heading from './typography/Heading';

interface IDemoAnimationProps {
  className?: string;
}

interface ICursorProps {
  className?: string;
}

/**
 * @description A component that displays a cursor for the typing animation
 * @param {string} props.className - The class name for the component
 */
function Cursor({ className = '' }: ICursorProps) {
  return (
    <span
      className={`${className} animation-blink animation-1s animation-step-end ml-px bg-gray-400 px-px font-bold`}
    ></span>
  );
}

/**
 * @description A component that displays a demo animation of an AsyncAPI document
 * @param {string} props.className - The class name for the component
 */
export default function DemoAnimation({ className = '' }: IDemoAnimationProps) {
  const [started] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showChannelsAndOperation, setShowChannelsAndOperation] = useState(false);
  const [showUntilMessagePayload, setShowUntilMessagePayload] = useState(false);
  const [showDisplayName, setShowDisplayName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showDisplayNameDescription, setShowDisplayNameDescription] = useState(false);
  const [showEmailDescription, setShowEmailDescription] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const typingDelay = 60;

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        setShowControls(true);
      }, 2000);
    }
  }, [finished]);

  /**
   * @description classes that displays a cursor for the typing animation
   * @param {boolean} condition - The condition to determine which class to apply
   */
  function transitionClassNames(condition: boolean) {
    return `transition-all duration-500 ease-in-out overflow-hidden ${condition ? 'opacity-100 max-h-auto' : 'max-h-0 opacity-0'}`;
  }

  /**
   * @description A component that displays a cursor for the typing animation
   */
  function renderTyping(children: React.ReactNode, callback: () => void) {
    return (
      <Typing typingDelay={typingDelay} cursor={<Cursor />} onTypingDone={callback}>
        {children}
      </Typing>
    );
  }

  /**
   * @description A component that displays info block
   */
  function renderInfoBlock(callback: () => void) {
    const descriptionCallback = () => setFinished(true);

    const common = (
      <>
        <div>
          <span className='text-teal-400'>asyncapi:</span> 3.0.0
        </div>
        <div>
          <span className='text-teal-400'>info:</span>
        </div>
        <div>
          <span className='text-teal-400'>&nbsp;&nbsp;title:</span> Account Service
        </div>
        <div>
          <span className='text-teal-400'>&nbsp;&nbsp;version:</span> 1.0.0
        </div>
        <Typing.Delay ms={500} />
      </>
    );

    if (showEmailDescription) {
      return (
        <>
          {common}
          <Typing typingDelay={typingDelay} cursor={<Cursor />} onTypingDone={descriptionCallback}>
            <div>
              <span className='text-teal-400'>&nbsp;&nbsp;description:</span> This service is in charge of processing
              user signups :rocket:
            </div>
          </Typing>
        </>
      );
    }

    return renderTyping(common, callback);
  }

  /**
   * @description A component that displays channels and operation block
   */
  function renderChannelsOperationBlock(callback: () => void) {
    return renderTyping(
      <>
        <div>
          <span className='text-teal-400'>channels:</span>
        </div>
        <div>
          <span className='text-yellow-300'>&nbsp;&nbsp;userSignedup:</span>
        </div>
        <div>
          <span className='text-purple-400'>&nbsp;&nbsp;&nbsp;&nbsp;address:</span>
          <span className='text-teal-200'>&apos;user/signedup&apos;</span>
        </div>
        <div>
          <span className='text-teal-400'>&nbsp;&nbsp;&nbsp;&nbsp;messages:</span>
        </div>
        <div>
          <span className='text-yellow-300'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userSignedupMessage:</span>
        </div>
        <div>
          <span className='text-teal-200'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ref:</span>
          <span className='text-teal-200'>&apos;#/components/messages/UserSignedUp&apos;</span>
        </div>
        <div>
          <span className='text-teal-400'>operations:</span>
        </div>
        <div>
          <span className='text-yellow-300'>&nbsp;&nbsp;processUserSignups:</span>
        </div>
        <div>
          <span className='text-purple-400'>&nbsp;&nbsp;&nbsp;&nbsp;action:</span>
          <span className='text-teal-200'>&apos;receive&apos;</span>
        </div>
        <div>
          <span className='text-teal-400'>&nbsp;&nbsp;&nbsp;&nbsp;channel:</span>
        </div>
        <div>
          <span className='text-teal-200'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ref:</span>
          <span className='text-teal-200'> &apos;#/channels/userSignedup&apos;</span>
        </div>
        <Typing.Delay ms={500} />
      </>,
      callback
    );
  }

  /**
   * @description A component that displays until message payload block
   */
  function renderUntilMessagePayload(callback: () => void) {
    return renderTyping(
      <>
        <div>
          <span className='text-teal-400'>components:</span>
        </div>
        <div>
          <span className='text-teal-400'>&nbsp;&nbsp;messages:</span>
        </div>
        <div>
          <span className='text-teal-200'>&nbsp;&nbsp;&nbsp;&nbsp;UserSignedUp:</span>
        </div>
        <div>
          <span className='text-teal-400'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payload:</span>
        </div>
        <div>
          <span className='text-teal-400'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:</span>
          <span> object</span>
        </div>
      </>,
      callback
    );
  }

  /**
   * @description A component that displays display name block
   */
  function renderDisplayName(callback: () => void) {
    const descriptionCallback = () => setShowDisplayNameDescription(true);

    const common = (
      <>
        <div>
          <span className='text-teal-400'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties:</span>
        </div>
        <div>
          <span className='text-green-400'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;displayName:
          </span>
        </div>
        <div>
          <span className='text-teal-400'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:
          </span>
          <span> string</span>
        </div>
      </>
    );

    if (showEmail) {
      return (
        <>
          {common}
          <Typing typingDelay={typingDelay} cursor={<Cursor />} onTypingDone={descriptionCallback}>
            <div>
              <span className='text-teal-400'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description:
              </span>
              <span> Name of the user</span>
            </div>
          </Typing>
        </>
      );
    }

    return renderTyping(common, callback);
  }

  /**
   * @description A component that displays email block
   */
  function renderEmail(callback: () => void) {
    const descriptionCallback = () => setShowEmailDescription(true);

    const common = (
      <>
        <div>
          <span className='text-green-400'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:</span>
        </div>
        <div>
          <span className='text-teal-400'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:
          </span>
          <span> string</span>
        </div>
        <div>
          <span className='text-teal-400'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:
          </span>
          <span> email</span>
        </div>
      </>
    );

    if (showDisplayNameDescription) {
      return (
        <>
          {common}
          <Typing typingDelay={typingDelay} cursor={<Cursor />} onTypingDone={descriptionCallback}>
            <div>
              <span className='text-teal-400'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description:
              </span>
              <span> Email of the user</span>
            </div>
          </Typing>
        </>
      );
    }

    return renderTyping(common, callback);
  }

  return (
    <div className={`${className} relative`}>
      <div
        className='transition-all duration-500 ease-in-out md:flex'
        style={showControls ? { filter: '', opacity: '1' } : undefined}
      >
        <div className='z-20 mb-2 md:mb-0 md:mr-1 md:flex-1'>
          <MacWindow
            className='h-full border border-gray-800 bg-code-editor-dark shadow-lg transition-all duration-500 ease-in-out'
            contentClassName='text-left text-white text-sm font-mono font-medium transition-all duration-500 ease-in-out break-words md:min-h-108'
            title='asyncapi.yaml'
          >
            {(showEmailDescription || started) && renderInfoBlock(() => setShowInfo(true))}
            {showInfo && renderChannelsOperationBlock(() => setShowChannelsAndOperation(true))}
            {showChannelsAndOperation && renderUntilMessagePayload(() => setShowUntilMessagePayload(true))}
            {(showUntilMessagePayload || showEmail) && renderDisplayName(() => setShowDisplayName(true))}
            {(showDisplayName || showDisplayNameDescription) && renderEmail(() => setShowEmail(true))}
          </MacWindow>
        </div>
        <div className={'relative z-10 transition-all duration-500 ease-in-out md:mb-0 md:ml-6 md:flex-1'}>
          <div
            className={`mt-8 text-center md:mt-0 md:text-left lg:absolute lg:inset-x-0 lg:top-0 lg:ml-48 lg:mr-8 ${showControls ? 'block' : 'hidden'}`}
          >
            <Heading typeStyle={HeadingTypeStyle.md} level={HeadingLevel.h2} className='mb-4'>
              Play with it!
            </Heading>
            <p className='font-normal tracking mx-auto mb-6 max-w-3xl text-lg text-gray-700'>
              Open this example on AsyncAPI Studio to get a better taste of the specification. No signup is required!
            </p>
            <OpenInStudioButton />
          </div>
          <MacWindow
            className={`min-h-full border border-gray-200 bg-gray-50 shadow-lg transition-all duration-500 ease-in-out ${showControls ? 'h-0 -translate-x-full opacity-0 lg:h-auto lg:-translate-x-3/4 lg:opacity-100' : ''}`}
            contentClassName='text-left h-full text-gray-800 text-sm font-medium transition-all duration-500 ease-in-out'
            title='Account Service Documentation'
          >
            <div className={`mb-8 mt-4 ${transitionClassNames(showInfo)}`}>
              <h1 className='text-2xl font-bold text-gray-500'>Account Service 1.0.0</h1>
              <p className={transitionClassNames(finished)}>This service is in charge of processing user signups 🚀</p>
            </div>

            <div className={transitionClassNames(showChannelsAndOperation)}>
              <span className='mr-2 rounded bg-green-500 px-3 py-2 font-bold text-white'>RECEIVES</span>{' '}
              <span className='text-lg text-gray-700'>user/signedup</span>
            </div>

            <div className={transitionClassNames(showUntilMessagePayload)}>
              <div className='mb-2 mt-4 text-gray-400'>Accepts the following message:</div>
              <div className='rounded bg-gray-200 p-4 text-gray-600'>
                Payload{' '}
                <ArrowRight
                  className={`inline-block size-4 transition-all duration-500 ease-in-out ${showDisplayName ? 'rotate-90' : ''}`}
                />{' '}
                <span className='ml-24 font-bold text-green-500'>Object</span>
                <div>
                  <div className='mt-2 rounded bg-gray-100 p-4'>
                    <div className={`mb-4 grid grid-cols-2 ${transitionClassNames(showDisplayName)}`}>
                      <div>displayName</div>
                      <div>
                        <div className='font-bold text-green-500'>String</div>
                        <div className={`text-sm ${transitionClassNames(showDisplayNameDescription)}`}>
                          Name of the user
                        </div>
                      </div>
                    </div>
                    <div className={`grid grid-cols-2 ${transitionClassNames(showEmail)}`}>
                      <div>email</div>
                      <div>
                        <div className='font-bold text-green-500'>
                          String
                          <span className='ml-2 rounded bg-yellow-300 px-1 py-0.5 text-xs text-black'>email</span>
                        </div>
                        <div className={`text-sm ${transitionClassNames(showEmailDescription)}`}>Email of the user</div>
                      </div>
                    </div>

                    <div className='mt-8 text-xs text-gray-400'>Additional properties are allowed.</div>
                  </div>

                  <div className='mt-4 rounded bg-code-editor-dark p-4 font-mono text-gray-400'>
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    <div className='text-gray-500'>// Example</div>
                    <div>&nbsp;</div>
                    <div>{'{'}</div>
                    <div className={transitionClassNames(showDisplayName)}>
                      <span className='text-teal-400'>&nbsp;&nbsp;&quot;displayName&quot;</span>:{' '}
                      <span className='text-white'>&quot;Eve & Chan&quot;</span>,
                    </div>
                    <div className={transitionClassNames(showEmail)}>
                      <span className='text-teal-400'>&nbsp;&nbsp;&quot;email&quot;</span>:{' '}
                      <span className='text-white'>&quot;info@asyncapi.io&quot;</span>
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
  );
}
