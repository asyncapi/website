import React, { useState } from 'react';
import GoodFirstIssues from '../../components/dashboard/GoodFirstIssues';
import Header from '../../components/dashboard/Header';
import Table from '../../components/dashboard/table/Table';
import GenericLayout from '../../components/layout/GenericLayout';
import data from '../../dashboard.json';

/**
 * @description Community Dashboard page.
 */
export default function Dashboard() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('hotTopics');

  return (
    <GenericLayout
      title="AsyncAPI - Dashboard"
      description={'description'}
      image={'image'}
      wide
    >
      <title>AsyncAPI - Dashboard</title>

      <div className="pt-8">
        <Header />
        <div className="mt-8">
          {/* Tab navigation */}
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('hotTopics')}
              className={`py-2 px-4 rounded-t-lg ${activeTab === 'hotTopics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Hot Topics
            </button>
            <button
              onClick={() => setActiveTab('goodFirstIssues')}
              className={`py-2 px-4 rounded-t-lg ${activeTab === 'goodFirstIssues' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Good First Issues
            </button>
          </div>

          {/* Content for each tab */}
          <div className="flex mt-6">
            {activeTab === 'hotTopics' && (
              <Table
                title={
                  <div className="flex gap-3">
                    <img
                      data-tooltip-target="tooltip-default"
                      src="/img/illustrations/icons/fire.svg"
                      alt="Tooltip"
                    />
                    <div
                      id="tooltip-default"
                      role="tooltip"
                      className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 dark:bg-gray-700 tooltip"
                    >
                      Tooltip content
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <span>Hot Topics</span>
                  </div>
                }
                data={data.hotDiscussions}
                className="lg:w-1/3"
                listClassName="lg:grid-cols-1"
              />
            )}

            {activeTab === 'goodFirstIssues' && (
              <GoodFirstIssues issues={data.goodFirstIssues} />
            )}
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}
