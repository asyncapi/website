import React from 'react';

import orbitData from '../../config/orbitData.json';
import Header from './Header';

interface HeroProps {
  className?: string;
}

/**
 * @description This component displays Hero Section.
 * @param {HeroProps} props - The props for Hero component.
 * @param {string} props.className - Additional CSS classes for styling.
 */
export default function Hero({ className = '' }: HeroProps) {
  return (
    <div className={`orbits overflow-hidden ${className}`}>
      <div className='orbit-container' data-testid='orbit-div'>
        <div id='first-orbit' className='orbit' data-testid='Hero-first'>
          {orbitData[0].map((orbit) => (
            <div key={orbit.id} className={orbit.id}>
              <img src={orbit.img} alt={orbit.alt} className='orbit-img' data-testid='Hero-firstimg' />
            </div>
          ))}
          <div className='absolute z-40 flex size-full justify-center'>
            <Header />
          </div>
        </div>
        <div id='second-orbit' className='orbit' data-testid='Hero-second'>
          {orbitData[1].map((orbit) => (
            <div key={orbit.id} className={orbit.id}>
              <img src={orbit.img} alt={orbit.alt} data-testid='Hero-secondimg' />
            </div>
          ))}
        </div>
        <div id='third-orbit' className='orbit' data-testid='Hero-third'>
          {orbitData[2].map((orbit) => (
            <div key={orbit.id} className={orbit.id}>
              <img src={orbit.img} alt={orbit.alt} data-testid='Hero-thirdimg' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
