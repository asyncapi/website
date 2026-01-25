import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const DefaultTabs: Story = {
  args: {
    tabs: [
      {
        id: 'JavaScript',
        content: (
          <pre className='h-full bg-code-editor-dark p-4 text-white'>
            <code>
              {`const asyncapi = require('asyncapi');

// Initialize AsyncAPI client
const client = new asyncapi.Client({
  url: 'ws://localhost:8080'
});

// Subscribe to messages
client.subscribe('user/signup', (message) => {
  console.log('New user:', message);
});`}
            </code>
          </pre>
        )
      },
      {
        id: 'Python',
        content: (
          <pre className='h-full bg-code-editor-dark p-4 text-white'>
            <code>
              {`import asyncapi

# Initialize AsyncAPI client
client = asyncapi.Client(url='ws://localhost:8080')

# Subscribe to messages
@client.subscribe('user/signup')
def handle_signup(message):
    print(f'New user: {message}')`}
            </code>
          </pre>
        )
      },
      {
        id: 'Java',
        content: (
          <pre className='h-full bg-code-editor-dark p-4 text-white'>
            <code>
              {`import com.asyncapi.Client;

// Initialize AsyncAPI client
Client client = new Client("ws://localhost:8080");

// Subscribe to messages
client.subscribe("user/signup", (message) -> {
    System.out.println("New user: " + message);
});`}
            </code>
          </pre>
        )
      }
    ]
  }
};

export const ConfigurationTabs: Story = {
  args: {
    tabs: [
      {
        id: 'YAML',
        content: (
          <pre className='h-full bg-code-editor-dark p-4 text-white'>
            <code>{'asyncapi: 3.0.0\ninfo:\n  title: User Service'}</code>
          </pre>
        )
      },
      {
        id: 'JSON',
        content: (
          <pre className='h-full bg-code-editor-dark p-4 text-white'>
            <code>{'{ "asyncapi": "3.0.0", "info": { "title": "User Service" } }'}</code>
          </pre>
        )
      }
    ]
  }
};
