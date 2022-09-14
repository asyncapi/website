import React from 'react'
import CommunityLayout from '../../../../components/layout/CommunityLayout'

function index() {
  return (
    <CommunityLayout
      title="Community docs and resources"
      description="Getting started with docs"
      wide
    >
      <div className="flex mt-40">
        <div className="w-4/12">
          <h4 className="text-lg text-primary-600">Getting started</h4>
          <div className="mt-5">
            <div className="w-full p-4 shadow shadow-slate-300 rounded-lg">
              <h1>Hello</h1>
            </div>
          </div>
        </div>
        <div className='p-10'>
            <h1>Hello world</h1>
        </div>
      </div>
    </CommunityLayout>
  );
}

export default index