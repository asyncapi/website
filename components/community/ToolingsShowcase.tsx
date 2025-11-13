'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

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

const toolsData: Record<string, ToolData> = {
  'go-asyncapi': {
    name: 'go-asyncapi',
    displayName: 'Go AsyncAPI',
    description:
      'This library helps to create AsyncAPI spec from your Go message structures. It uses reflection to translate Go structures in JSON Schema definitions and arrange them in AsyncAPI schema.',
    language: 'Go',
    link: 'https://github.com/swaggest/go-asyncapi',
    color: 'border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
    badge: 'Open Source'
  },
  faststream: {
    name: 'faststream',
    displayName: 'FastStream',
    description:
      'A powerful and easy-to-use Python framework for building asynchronous services interacting with event streams such as Apache Kafka, RabbitMQ and NATS.',
    language: 'Python',
    link: 'https://faststream.ag2.ai',
    color: 'border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
    badge: 'Open Source'
  },
  modelina: {
    name: 'modelina',
    displayName: 'AsyncAPI Modelina',
    description:
      'Generate payload models into Java, TypeScript, Go, etc, you name it, from AsyncAPI documents. This tool gives you full control over the models through high customization.',
    language: 'TypeScript',
    link: 'https://modelina.org',
    color: 'border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
    badge: 'Open Source'
  },
  converter: {
    name: 'converter',
    displayName: 'Converter',
    description: 'Converts old versions of AsyncAPI files into the latest version.',
    language: 'TypeScript',
    link: 'https://www.asyncapi.com/tools/converter',
    color: 'border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20',
    badge: 'Open Source'
  },
  'java-asyncapi': {
    name: 'java-asyncapi',
    displayName: 'Java AsyncAPI',
    description: 'This tool stores modules, which simplifies interacting with AsyncAPI in jvm ecosystem.',
    language: 'Java',
    link: 'https://github.com/asyncapi/jasyncapi',
    color: 'border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
    badge: 'Open Source'
  },
  'kotlin-asyncapi': {
    name: 'kotlin-asyncapi',
    displayName: 'Kotlin AsyncAPI',
    description:
      'The Kotlin AsyncAPI project aims to provide convenience tools for generating and serving AsyncAPI documentation. The core of this project is a Kotlin DSL for building the specification in a typesafe way.',
    language: 'Kotlin',
    link: 'https://github.com/OpenFolder/kotlin-asyncapi',
    color: 'border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
    badge: 'Open Source'
  },
  saunter: {
    name: 'saunter',
    displayName: 'Saunter',
    description:
      'Saunter is an AsyncAPI documentation generator for dotnet. Generates (and hosts) an AsyncAPI schema document from your code.',
    language: 'C#',
    link: 'https://github.com/tehmantra/saunter',
    color: 'border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20',
    badge: 'Open Source'
  }
};

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
