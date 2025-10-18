import React, { useState } from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import { useTranslation } from '../utils/i18n';
import ArrowRight from './icons/ArrowRight';
import Heading from './typography/Heading';
import Paragraph from './typography/Paragraph';

/**
 * @description This component displays the Sneak Peek section with tabs showing AsyncAPI examples
 */
export default function SneakPeek() {
  const { t } = useTranslation('landing-page');
  const [activeTab, setActiveTab] = useState<'document' | 'generation' | 'documentation'>('document');
  const [showPayload, setShowPayload] = useState(true);

  const renderAsyncAPICode = () => (
    <>
      <div>
        <span className='text-teal-400'>asyncapi:</span> <span className='text-white'>3.0.0</span>
      </div>
      <div>
        <span className='text-teal-400'>info:</span>
      </div>
      <div>
        <span className='text-teal-400'>&nbsp;&nbsp;title:</span> <span className='text-white'>Account Service</span>
      </div>
      <div>
        <span className='text-teal-400'>&nbsp;&nbsp;version:</span> <span className='text-white'>1.0.0</span>
      </div>
      <div>
        <span className='text-teal-400'>&nbsp;&nbsp;description:</span>{' '}
        <span className='text-white'>This service is in charge of processing user signups :rocket:</span>
      </div>
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
        <span className='text-yellow-300'>&nbsp;&nbsp;processUserSignedupMessage:</span>
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
        <span className='text-teal-200'> &apos;#/channels/UserSignedup&apos;</span>
      </div>
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
        <span className='text-white'> object</span>
      </div>
      <div>
        <span className='text-teal-400'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties:</span>
      </div>
      <div>
        <span className='text-green-400'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;displayName:</span>
      </div>
      <div>
        <span className='text-teal-400'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:
        </span>
        <span className='text-white'> object</span>
      </div>
      <div>
        <span className='text-teal-400'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description:
        </span>
        <span className='text-white'> Name of the User</span>
      </div>
      <div>
        <span className='text-green-400'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:</span>
      </div>
      <div>
        <span className='text-teal-400'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:
        </span>
        <span className='text-white'> string</span>
      </div>
      <div>
        <span className='text-teal-400'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:
        </span>
        <span className='text-white'> email</span>
      </div>
      <div>
        <span className='text-teal-400'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description:
        </span>
        <span className='text-white'> Email of the User</span>
      </div>
    </>
  );

  const renderGenerationCode = () => (
    <>
      <div>
        <span className='text-gray-500'>{'//'} Generated TypeScript code</span>
      </div>
      <div>
        <span className='text-purple-400'>export</span> <span className='text-purple-400'>interface</span>{' '}
        <span className='text-yellow-200'>UserSignedUp</span> {'{'}
      </div>
      <div>
        &nbsp;&nbsp;<span className='text-white'>displayName</span>: <span className='text-teal-400'>string</span>;
      </div>
      <div>
        &nbsp;&nbsp;<span className='text-white'>email</span>: <span className='text-teal-400'>string</span>;
      </div>
      <div>{'}'}</div>
      <div>&nbsp;</div>
      <div>
        <span className='text-purple-400'>export</span> <span className='text-purple-400'>class</span>{' '}
        <span className='text-yellow-200'>UserSignupService</span> {'{'}
      </div>
      <div>
        &nbsp;&nbsp;<span className='text-purple-400'>async</span>{' '}
        <span className='text-yellow-300'>processSignup</span>(<span className='text-orange-300'>message</span>:{' '}
        <span className='text-yellow-200'>UserSignedUp</span>): <span className='text-yellow-200'>Promise</span>
        {'<'}
        <span className='text-teal-400'>void</span>
        {'>'} {'{'}
      </div>
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className='text-gray-500'>{'//'} Your business logic here</span>
      </div>
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className='text-yellow-200'>console</span>.
        <span className='text-yellow-300'>log</span>(
        <span className='text-teal-200'>
          `Processing signup for ${'{'}
          message.displayName{'}'}`
        </span>
        );
      </div>
      <div>&nbsp;&nbsp;{'}'}</div>
      <div>{'}'}</div>
    </>
  );

  const renderDocumentationCode = () => (
    <div className='font-sans text-gray-800'>
      <div className='mb-6 mt-2 sm:mb-8 sm:mt-4'>
        <h1 className='text-xl sm:text-2xl font-bold text-gray-500'>Account Service 1.0.0</h1>
        <p className='text-sm sm:text-base text-gray-700 mt-2'>
          This service is in charge of processing user signups 🚀
        </p>
      </div>

      <div className='mb-4 flex flex-wrap items-center gap-2'>
        <span className='rounded bg-green-500 px-2 py-1 sm:px-3 sm:py-2 font-bold text-white text-xs'>RECEIVES</span>
        <span className='text-sm sm:text-base text-gray-700 break-all'>user/signedup</span>
      </div>

      <div>
        <div className='mb-2 mt-4 text-xs sm:text-sm text-gray-500'>Accepts the following message:</div>
        <div className='rounded bg-gray-200 p-3 sm:p-4 text-gray-600'>
          <div
            className='cursor-pointer'
            onClick={() => setShowPayload(!showPayload)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setShowPayload(!showPayload);
            }}
            role='button'
            tabIndex={0}
          >
            <span className='font-medium text-sm sm:text-base'>Payload</span>{' '}
            <ArrowRight
              className={`inline-block size-4 transition-all duration-300 ease-in-out ${showPayload ? 'rotate-90' : ''}`}
            />{' '}
            <span className='ml-4 sm:ml-24 font-bold text-green-500 text-sm sm:text-base'>Object</span>
          </div>
          {showPayload && (
            <div>
              <div className='mt-2 rounded bg-gray-100 p-3 sm:p-4'>
                <div className='mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                  <div className='text-sm font-medium text-gray-700'>displayName</div>
                  <div>
                    <div className='font-bold text-green-500 text-sm'>String</div>
                    <div className='text-xs text-gray-600 mt-1'>Name of the user</div>
                  </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                  <div className='text-sm font-medium text-gray-700'>email</div>
                  <div>
                    <div className='font-bold text-green-500 text-sm'>
                      String
                      <span className='ml-2 rounded bg-yellow-300 px-1.5 py-0.5 text-xs text-black font-normal'>
                        email
                      </span>
                    </div>
                    <div className='text-xs text-gray-600 mt-1'>Email of the user</div>
                  </div>
                </div>

                <div className='mt-6 sm:mt-8 text-xs text-gray-500'>Additional properties are allowed.</div>
              </div>

              <div className='mt-4 rounded bg-[#252f3f] p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto'>
                <div className='text-gray-500'>{'//'} Example</div>
                <div>&nbsp;</div>
                <div className='text-gray-300'>{'{'}</div>
                <div>
                  <span className='text-teal-400'>&nbsp;&nbsp;&quot;displayName&quot;</span>:{' '}
                  <span className='text-white'>&quot;Eve & Chan&quot;</span>
                  <span className='text-gray-300'>,</span>
                </div>
                <div>
                  <span className='text-teal-400'>&nbsp;&nbsp;&quot;email&quot;</span>:{' '}
                  <span className='text-white'>&quot;info@asyncapi.io&quot;</span>
                </div>
                <div className='text-gray-300'>{'}'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'document', label: 'AsyncAPI Document', render: renderAsyncAPICode },
    { id: 'generation', label: 'Code Generation', render: renderGenerationCode },
    { id: 'documentation', label: 'Documentation', render: renderDocumentationCode }
  ] as const;

  return (
    <section className='relative bg-sky-100 dark:bg-dark-card py-8 sm:py-12 lg:py-16'>
      <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'>
        <Heading
          level={HeadingLevel.h2}
          typeStyle={HeadingTypeStyle.lg}
          className='mt-2 text-gray-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl'
        >
          {t('sneakpeek.title')}
        </Heading>
        <Paragraph className='mx-auto mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-prose'>
          {t('sneakpeek.description')}
        </Paragraph>

        {/* Tabs Container */}
        <div className='mt-8 sm:mt-12'>
          {/* Tabs Bar */}
          <div className='flex flex-col sm:flex-row justify-center bg-dark-background dark:bg-dark-card rounded-t-lg overflow-hidden'>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  index !== tabs.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''
                } ${'border-gray-300 dark:border-gray-300'} ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-[#1B1B2F] text-gray-900 dark:text-white'
                    : 'bg-[#2D1F3F] dark:bg-[#14111D] text-gray-300 dark:text-gray-400 hover:bg-[#3D2F4F] dark:hover:bg-[#1F1A2F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className='text-left'>
            {tabs.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
                <div
                  className={`rounded-b-lg p-3 sm:p-4 lg:p-6 overflow-auto shadow-lg min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] max-h-[500px] sm:max-h-[600px] ${
                    tab.id === 'documentation' ? 'bg-gray-50 dark:bg-gray-100' : 'bg-[#1B1130] dark:bg-[#0A0515]'
                  }`}
                >
                  <div
                    className={
                      tab.id === 'documentation' ? '' : 'text-[10px] sm:text-xs md:text-sm leading-relaxed font-mono'
                    }
                  >
                    {tab.render()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
