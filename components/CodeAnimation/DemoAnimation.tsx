import React, { useState } from 'react';

import Container from '../layout/Container';
import renderAsyncAPIContent from './AsyncAPIcontent';
import renderCodeGeneration from './CodeGeneration';
import renderDocumentation from './Documentation';

/**
 * @description A React component that displays a demo animation interface with three tabs:
 * "AsyncAPI Document," "Code Generation," and "Documentation." The content of each tab
 * dynamically updates based on the active tab selected by the user.
 *
 */
export default function DemoAnimation() {
  const [activeTab, setActiveTab] = useState('AsyncAPI Document');
  const tabs = ['AsyncAPI Document', 'Code Generation', 'Documentation'];

  /**
   * @description Determines and renders the content for the currently active tab.
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'Code Generation':
        return renderCodeGeneration();
      case 'Documentation':
        return renderDocumentation();
      default:
        return renderAsyncAPIContent();
    }
  };

  return (
    <div className='relative inset-x-1/2 mx-[-50vw] w-screen bg-blue-100 p-6 font-sans'>
      <Container>
        <h1 className='mb-2 text-center text-2xl font-medium'>Sneak Peek Into The Real Process</h1>
        <p className='mb-6 text-center text-sm text-gray-600'>
          One of our main goals is to improve the current state of Event
          <br />
          Driven Architecture (EDA!)
        </p>

        <div className='mb-4 flex flex-wrap overflow-hidden rounded-lg bg-black'>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`m-2 flex-1 rounded px-4 py-2 text-center text-sm transition-colors duration-200 ${
                activeTab === tab ? 'bg-white text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className='min-h-[400px] rounded-lg bg-[#1a1b26] p-6 transition-all duration-200'>
          <div className='max-w-full overflow-auto'>
            <div className='overflow-x-auto whitespace-pre-wrap'>{renderContent()}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
