import React from 'react';
import Heading from '../../components/typography/Heading';
import CommunityLayout from '../../components/layout/CommunityLayout';

const orbit1 = [
  {
    id: 'item',
    img: '/img/homepage/reaction.png',
    alt: 'reaction',
  },
  {
    id: 'item',
    img: '/img/homepage/ale.jpeg',
    alt: 'ale',
  },
  {
    id: 'item',
    img: '/img/homepage/idea.png',
    alt: 'idea',
  },
  {
    id: 'item',
    img: '/img/homepage/lukasz-homepage-slack.jpg',
    alt: 'lukasz',
  },
  {
    id: 'item',
    img: '/img/homepage/comment.png',
    alt: 'comment',
  },
  {
    id: 'item',
    img: '/img/homepage/fran.png',
    alt: 'fran',
  },
];


const orbit2 = [
  {
    id: 'item-2',
    img: '/img/homepage/jonas.jpeg',
    alt: 'jonas',
  },
  {
    id: 'item-2',
    img: '/img/homepage/slack.png',
    alt: 'slack',
  },
  {
    id: 'item-2',
    img: '/img/homepage/missy.jpeg',
    alt: 'missy',
  },
  {
    id: 'item-2',
    img: '/img/homepage/check.png',
    alt: 'check',
  },
  {
    id: 'item-2',
    img: '/img/homepage/eve-and-chan.png',
    alt: 'eve-chan',
  },
  {
    id: 'item-2',
    img: '/img/homepage/maciej.png',
    alt: 'maciej',
  },
  {
    id: 'item-2',
    img: '/img/homepage/git.png',
    alt: 'git',
  },
];

const orbit3 = [
  {
    id: 'item-3',
    img: '/img/homepage/ace.jpeg',
    alt: 'ace',
  },
  {
    id: 'item-3',
    img: '/img/homepage/slack.png',
    alt: 'slack',
  },
  {
    id: 'item-3',
    img: '/img/homepage/barbano.jpeg',
    alt: 'barbano',
  },
  {
    id: 'item-3',
    img: '/img/homepage/dale.jpeg',
    alt: 'dale',
  },
  {
    id: 'item-3',
    img: '/img/homepage/kuda.jpeg',
    alt: 'kuda',
  },
  {
    id: 'item-3',
    img: '/img/homepage/maciej.png',
    alt: 'maciej',
  },
  {
    id: 'item-3',
    img: '/img/homepage/sergio.jpeg',
    alt: 'sergio',
  },
];

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
            {orbit1.map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} />
              </div>
            ))}
          </div>
          <div id="second-orbit" className="orbit">
            {orbit2.map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} />
              </div>
            ))}
          </div>
          <div id="third-orbit" className="orbit">
            {orbit3.map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}

export default CommunityIndexPage;
