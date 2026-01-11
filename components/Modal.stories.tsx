import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const DefaultModal: Story = {
  args: {
    title: 'Modal Title',
    children: 'This is the default modal content.'
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className='rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600'
        >
          Open Modal
        </button>
        {isOpen && <Modal {...args} onModalClose={() => setIsOpen(false)} />}
      </>
    );
  }
};

export const LongContentModal: Story = {
  args: {
    title: 'Terms and Conditions',
    children: (
      <div>
        <h2 className='mb-4 text-xl font-bold'>Introduction</h2>
        <p className='mb-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <h2 className='mb-4 text-xl font-bold'>Section 1</h2>
        <p className='mb-4'>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <h2 className='mb-4 text-xl font-bold'>Section 2</h2>
        <p className='mb-4'>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
        </p>
      </div>
    )
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className='rounded bg-primary-500 px-4 py-2 text-white hover:bg-primary-600'
        >
          Open Modal
        </button>
        {isOpen && <Modal {...args} onModalClose={() => setIsOpen(false)} />}
      </>
    );
  }
};
