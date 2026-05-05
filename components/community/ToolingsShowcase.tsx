'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import communityToolingsShowcase from '../../config/community-toolings-showcase.json';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import ToolingCard from './ToolingCard';

interface ToolData {
  name: string;
  displayName: string;
  description: string;
  language: string;
  link: string;
  color: string;
  badge?: string;
}

const toolsData: Record<string, ToolData> = communityToolingsShowcase as Record<string, ToolData>;

/**
 * @description ToolingsShowcase component for displaying AsyncAPI tools collection
 */
export default function ToolingsShowcase() {
  const [selectedTool, setSelectedTool] = useState<string>('java-asyncapi');
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  const currentTool = toolsData[selectedTool];

  const handleToolChange = (toolName: string) => {
    if (toolName === selectedTool) return;

    // Start shuffle animation
    setIsShuffling(true);

    // Change tool after shuffle animation starts
    setTimeout(() => {
      setSelectedTool(toolName);
      setIsShuffling(false);
    }, 300);
  };

  return (
    <div className='mt-20 py-20 px-6 md:px-12 bg-gray-50 dark:bg-dark-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-16'>
          {/* Left Content */}
          <div className='flex-1 space-y-8'>
            <div>
              <Heading
                level={HeadingLevel.h1}
                typeStyle={HeadingTypeStyle.xl}
                className='text-gray-900 dark:text-dark-heading font-bold mb-4'
              >
                Checkout Our Collection of Toolings
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.lg} className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                Discover various AsyncAPI tools to optimize your journey! These tools are made by the community, for the
                community.
              </Paragraph>
            </div>

            {/* Explore Tools Button */}
            <Link
              href='/tools'
              className='inline-block px-8 py-4 bg-primary-500 hover:bg-primary-600
                dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-all
                font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              Explore Tools
            </Link>

            {/* Tool Tags */}
            <div className='flex flex-wrap gap-3 pt-4'>
              {Object.values(toolsData).map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => handleToolChange(tool.name)}
                  className={`px-4 py-2 border-2 ${tool.color} rounded-lg transition-all font-medium hover:shadow-md ${
                    selectedTool === tool.name
                      ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-dark-background'
                      : ''
                  }`}
                >
                  {tool.displayName}
                </button>
              ))}
            </div>
          </div>

          {/* Right Card Showcase */}
          <div
            className={`flex-1 w-full lg:max-w-xl flex justify-center lg:justify-end pt-8 pb-4 
              pl-16 pr-4 transition-all duration-300 ease-in-out ${
                isShuffling
                  ? 'opacity-0 scale-90 -rotate-6 translate-x-[-30px]'
                  : 'opacity-100 scale-100 rotate-0 translate-x-0'
              }`}
          >
            <ToolingCard
              name={currentTool.displayName}
              description={currentTool.description}
              badge={currentTool.badge}
              language={currentTool.language}
              link={currentTool.link}
              isShuffling={isShuffling}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
