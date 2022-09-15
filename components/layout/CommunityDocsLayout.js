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
      className="md:flex md:flex-row-reverse mt-20"
    >
      <div className="p-20 md:w-8/12 -mt-20">{children}</div>
      <div className="md:w-4/12 w-full sticky top-40 self-start">
        <div>
          <CommunityDocsNav navlist={navItems} post={post} />
        </div>
      </div>
    </CommunityLayout>
  );
}

export default CommunityDocsLayout