import { TerminalIcon } from '@heroicons/react/outline';
import type React from 'react';

import IconGenerator from '../icons/Generator';
import IconGithubActions from '../icons/GithubActions';
import IconHub from '../icons/Hub';
import IconModelina from '../icons/Modelina';
import IconParser from '../icons/Parser';

interface ToolingItem {
  href: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  beta?: boolean;
}

const toolingItems: ToolingItem[] = [
  {
    href: 'https://studio.asyncapi.com/',
    icon: IconHub,
    title: 'Studio',
    description: 'Visually design your AsyncAPI files and event-driven architecture.',
    beta: true
  },
  {
    href: '/tools/generator',
    icon: IconGenerator,
    title: 'Generator',
    description: 'Use your AsyncAPI files to generate documentation, code, anything!'
  },
  {
    href: '/tools/cli',
    icon: TerminalIcon,
    title: 'CLI',
    description: 'Interact with AsyncAPI from the comfort of your CLI.'
  },
  {
    href: '/tools/modelina',
    icon: IconModelina,
    title: 'Modelina',
    description:
      'Modelina is a library for generating data models based on inputs such as AsyncAPI, OpenAPI, or JSON Schema documents'
  },
  {
    href: '/tools/github-actions',
    icon: IconGithubActions,
    title: 'GitHub Actions',
    description: 'Automate the validation and generation of documentation.'
  },
  {
    href: '/tools/parsers',
    icon: IconParser,
    title: 'Parsers',
    description: 'Parse AsyncAPI documents right inside your tools and products.'
  }
];

export default toolingItems;
