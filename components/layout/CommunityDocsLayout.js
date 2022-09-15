import React from 'react'
import CommunityDocsNav from '../navigation/CommunityDocsNav';
import CommunityLayout from './CommunityLayout'

function CommunityDocsLayout({
  children,
  post,
  navItems
}) {
  return (
    <CommunityLayout
      title="Community docs and resources"
      description="Getting started with docs"
      wide
      className='flex mt-20'
    >
        <div className="w-4/12 sticky top-40 self-start">
          <div>
            <CommunityDocsNav navlist={navItems} post={post} />
          </div>
        </div>
        <div className="p-20 w-8/12 -mt-20">
          {children}
        </div>
    </CommunityLayout>
  );
}

export default CommunityDocsLayout