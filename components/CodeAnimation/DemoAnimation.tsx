import React, { useState } from 'react';
import renderAsyncAPIContent from './AsyncAPIcontent';
import renderCodeGeneration from './CodeGeneration';
import renderDocumentation from './Documentation';
import Container from '../layout/Container';

export default function DemoAnimation() {
  const [activeTab, setActiveTab] = useState('AsyncAPI Document');
  const tabs = ['AsyncAPI Document', 'Code Generation', 'Documentation'];

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
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-blue-100 p-6 font-sans">
      <Container>
      <h1 className="text-2xl font-medium text-center mb-2">
        Sneak Peek Into The Real Process
      </h1>
      <p className="text-center text-gray-600 text-sm mb-6">
        One of our main goals is to improve the current state of Event<br />
        Driven Architecture (EDA!)
      </p>

      <div className="flex flex-wrap mb-4 bg-black rounded-lg overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 px-4 m-2 text-center rounded text-sm transition-colors duration-200 ${activeTab === tab
                ? 'bg-white text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-800'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#1a1b26] rounded-lg p-6 min-h-[400px] transition-all duration-200">
          <div className="overflow-auto max-w-full">
            <div className="overflow-x-auto whitespace-pre-wrap">
              {renderContent()}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};