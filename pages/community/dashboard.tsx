import React from 'react';

import GoodFirstIssues from '../../components/dashboard/GoodFirstIssues';
import Header from '../../components/dashboard/Header';
import Table from '../../components/dashboard/table/Table';
import GenericLayout from '../../components/layout/GenericLayout';
import data from '../../dashboard.json';

/**
 * @description Community Dashboard page.
 */
export default function Dashboard() {
  return (
    <GenericLayout title='AsyncAPI - Dashboard' description={'description'} image={'image'} wide>
      <title>AsyncAPI - Dashboard</title>

      <div className='pt-8'>
        <Header />
        <div className='mt-8 flex w-full flex-col  gap-6  md:flex-row'>
          <Table
            title={
              <div className='flex gap-3'>
                <img data-tooltip-target='tooltip-default' src='/img/illustrations/icons/fire.svg' alt='Tooltip' />
                <div
                  id='tooltip-default'
                  role='tooltip'
                  className='tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700'
                >
                  Tooltip content
                  <div className='tooltip-arrow' data-popper-arrow></div>
                </div>
                <span>Hot Topics</span>
              </div>
            }
            data={data.hotDiscussions}
            className='lg:w-1/3'
            listClassName='lg:grid-cols-1'
          />
          <GoodFirstIssues issues={data.goodFirstIssues} />
        </div>
      </div>
    </GenericLayout>
  );
}
