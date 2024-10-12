import React from 'react';

import SlackMessage from './Message';

interface SlackProps {
  className?: string;
}

/**
 * @description Slack component for displaying Slack-like UI.
 * @param {string} props.className - Additional CSS classes for styling.
 */
export default function Slack({ className = '' }: SlackProps) {
  return (
    <div className={`flex overflow-hidden rounded-md border border-gray-200 bg-white ${className}`}>
      <div className='hidden w-1/5 bg-slack p-2 sm:block'>
        <div className='mb-1 h-2 w-3/4 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/3 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/2 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/4 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/3 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-3/4 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/3 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/2 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/2 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/4 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/3 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-3/4 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/2 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/4 rounded-xl bg-white/25'></div>
        <div className='mb-1 h-2 w-1/3 rounded-xl bg-white/25'></div>
      </div>
      <div className='flex-1 py-2' data-testid='SlackMessage'>
        <SlackMessage
          avatar='/img/homepage/lukasz-homepage-slack.webp'
          name='Lukasz Gornicki'
          text={
            <>
              Good Morning
              <img className='ml-1 inline-block size-5' src='/img/homepage/grain.png' alt='grain' />
              <img className='ml-1 inline-block size-5' src='/img/homepage/coffee.png' alt='coffee' />
            </>
          }
          reactions={[
            { icon: '/img/homepage/coffee.png', name: 'coffee', count: 6, mine: true },
            { icon: '/img/homepage/coffee-parrot.gif', name: 'coffee-parrot', count: 4, mine: true },
            { icon: '/img/homepage/coffee-bean.png', name: 'coffee-bean', count: 6, mine: true },
            { icon: '/img/homepage/parrotsleep.gif', name: 'parrotsleep', count: 1, mine: false }
          ]}
        />
        <SlackMessage
          avatar='/img/homepage/eve-and-chan.webp'
          name='Eve & Chan'
          text={<span className='text-gray-500'>Joined #general.</span>}
        />
        <SlackMessage
          avatar='/img/homepage/eve-and-chan.webp'
          name='Eve & Chan'
          text={<span>Hey folks! 👋</span>}
          reactions={[{ emoji: '👋', count: 21, mine: true }]}
        />
        <SlackMessage
          avatar='/img/avatars/fmvilas.webp'
          name='fmvilas'
          text={<span>Hey Eve & Chan! Welcome to the AsyncAPI workspace!</span>}
        />
      </div>
    </div>
  );
}
