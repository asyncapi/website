import React from 'react';
import CommunityLayout from '../../components/layout/CommunityLayout';

function CommunityIndexPage() {
  return (
    <CommunityLayout
      title="AsyncAPI Meetings"
      description="The home for developer communities"
      wide
    >
      <div className="h-screen">
        <div className="orbit-container">
          <div id="first-orbit" className="orbit">
            <div id="circle-around-first-1" className="circle-around-orbit">
              <div>
                <img src="/img/homepage/idea.png" alt="idea" />
              </div>
            </div>
            <div id="circle-around-first-2" className="circle-around-orbit">
              <img src="/img/homepage/fran.png" alt="idea" />
            </div>
            <div id="circle-around-first-3" className="circle-around-orbit">
              <img src="/img/homepage/ale.jpeg" alt="idea" />
            </div>
            <div id="circle-around-first-4" className="circle-around-orbit">
              <div>
                <img src="/img/homepage/comment.png" alt="idea" />
              </div>
            </div>
            <div id="circle-around-first-5" className="circle-around-orbit">
              <div>
                <img src="/img/homepage/reaction.png" alt="idea" />
              </div>
            </div>
          </div>
          <div id="uranus-orbit" className="orbit">
            <div id="uranus"></div>
          </div>
          <div id="neptune-orbit" className="orbit">
            <div id="neptune"></div>
          </div>
          {/* <div id="pluto-orbit" className="orbit">
            <div id="pluto"></div>
          </div> */}
        </div>
      </div>
    </CommunityLayout>
  );
}

export default CommunityIndexPage;
