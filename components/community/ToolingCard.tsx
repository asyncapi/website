import React from 'react';

interface ToolingCardProps {
  name: string;
  description: string;
  badge?: string;
  language: string;
  link?: string;
  isShuffling?: boolean;
}

/**
 * @description ToolingCard component for displaying AsyncAPI tools with stacked, rotated effect
 */
export default function ToolingCard({ name, description, badge, language, link, isShuffling }: ToolingCardProps) {
  const CardContent = (
    <div className='relative max-w-xl w-full'>
      {/* Stacked Cards Behind - Positioned on LEFT side */}
      <div
        className={`absolute w-full h-full bg-gradient-to-br from-purple-200 to-purple-300 
          dark:from-purple-800/60 dark:to-purple-700/50 rounded-3xl shadow-xl border-4 
          border-purple-400 dark:border-purple-600 transition-all duration-300 ${
            isShuffling ? 'transform -rotate-[18deg] translate-x-[-10px]' : 'transform -rotate-[12deg]'
          }`}
        style={{ top: '-15px', left: '-45px', zIndex: 1 }}
      />
      <div
        className={`absolute w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 
          dark:from-purple-800/70 dark:to-purple-700/60 rounded-3xl shadow-xl border-4 
          border-purple-300 dark:border-purple-500 transition-all duration-300 ${
            isShuffling ? 'transform -rotate-[13deg] translate-x-[-5px]' : 'transform -rotate-[7deg]'
          }`}
        style={{ top: '-10px', left: '-25px', zIndex: 2 }}
      />

      {/* Main Card */}
      <div className='relative bg-white dark:bg-dark-card rounded-3xl p-10 shadow-2xl dark:shadow-primary-500/20 overflow-hidden border-4 border-primary-500 dark:border-primary-400 h-[520px] transition-all hover:translate-y-[-4px] hover:shadow-3xl cursor-pointer z-10'>
        {/* Background Vector Graphics - Matching exact design */}
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          {/* Top Background Layers - Gray to Purple gradient triangular shapes */}
          <div className='absolute -top-20 -right-32 w-[600px] h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 opacity-40 transform rotate-[25deg] rounded-[80px]' />
          <div className='absolute -top-16 -right-24 w-[500px] h-[280px] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 opacity-40 transform rotate-[25deg] rounded-[70px]' />
          <div className='absolute -top-12 -right-16 w-[420px] h-[260px] bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 opacity-50 transform rotate-[25deg] rounded-[60px]' />

          {/* Bottom Large Fan/Petal Shape - Blue gradient */}
          <div className='absolute -bottom-40 -left-32 w-[700px] h-[500px]'>
            <svg
              viewBox='0 0 500 500'
              xmlns='http://www.w3.org/2000/svg'
              className='w-full h-full'
              aria-hidden='true'
              role='presentation'
              focusable='false'
            >
              <defs>
                <linearGradient id='blueGradient' x1='20%' y1='80%' x2='80%' y2='20%'>
                  <stop
                    offset='0%'
                    className='text-primary-500 dark:text-primary-600'
                    stopColor='currentColor'
                    stopOpacity='0.9'
                  />
                  <stop
                    offset='40%'
                    className='text-blue-400 dark:text-blue-500'
                    stopColor='currentColor'
                    stopOpacity='0.85'
                  />
                  <stop
                    offset='100%'
                    className='text-cyan-400 dark:text-cyan-600'
                    stopColor='currentColor'
                    stopOpacity='0.8'
                  />
                </linearGradient>
              </defs>
              {/* Fan/Petal shape spreading from bottom left */}
              <path
                fill='url(#blueGradient)'
                d='M 50 450 Q 150 350 280 320 Q 400 300 480 340 Q 500 380 470 420
                   Q 440 460 380 480 Q 280 500 180 490 Q 100 480 50 450 Z
                   M 60 440 Q 140 380 240 360 Q 320 350 380 380
                   L 320 420 Q 240 400 160 430 Z
                   M 80 430 Q 150 390 220 380 Q 280 375 320 395
                   L 280 420 Q 220 410 160 425 Z'
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col h-full'>
          {/* Badge */}
          {badge && (
            <div className='inline-block self-start mb-6 px-5 py-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-full'>
              <span className='text-sm font-semibold text-gray-900 dark:text-gray-200'>{badge}</span>
            </div>
          )}

          {/* Tool Name */}
          <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-5'>{name}</h3>

          {/* Description */}
          <p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-base flex-grow'>{description}</p>

          {/* Language Tag */}
          <div className='inline-block self-start px-5 py-2.5 border-2 border-pink-500 dark:border-pink-400 rounded-lg'>
            <span className='text-sm font-bold text-pink-600 dark:text-pink-400 uppercase'>{language}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target='_blank' rel='noopener noreferrer' className='block'>
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
