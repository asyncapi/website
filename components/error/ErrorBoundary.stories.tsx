import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import ContextualErrorFallback from './ContextualErrorFallback';
import ErrorBoundary from './ErrorBoundary';
import GlobalErrorFallback from './GlobalErrorFallback';

/**
 * @description A helper component that always throws so the boundary renders
 * its fallback inside Storybook.
 */
function Bomb(): React.JSX.Element {
  throw new Error('💥 Simulated rendering crash for demonstration purposes.');
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const DefaultGlobalFallback: Story = {
  render: () => (
    <ErrorBoundary resetOnRouteChange={false}>
      <Bomb />
    </ErrorBoundary>
  )
};

export const ContextualFallback: Story = {
  render: () => (
    <ErrorBoundary
      resetOnRouteChange={false}
      fallback={({ reset }) => <ContextualErrorFallback error={null} reset={reset} label='widget' />}
    >
      <Bomb />
    </ErrorBoundary>
  )
};

export const CustomRenderFallback: Story = {
  render: () => (
    <ErrorBoundary
      resetOnRouteChange={false}
      fallback={({ error, reset }) => (
        <div className='rounded-md border border-red-300 bg-red-50 p-4'>
          <p className='font-sans text-sm text-red-800'>Custom fallback: {error?.message}</p>
          <button type='button' onClick={reset} className='mt-2 text-sm font-semibold text-red-700 underline'>
            Retry
          </button>
        </div>
      )}
    >
      <Bomb />
    </ErrorBoundary>
  )
};

export const HealthyChildren: Story = {
  render: () => (
    <ErrorBoundary resetOnRouteChange={false}>
      <p className='font-sans text-sm text-gray-700'>Everything rendered fine — no fallback shown.</p>
    </ErrorBoundary>
  )
};

export const GlobalFallbackStandalone: Story = {
  render: () => <GlobalErrorFallback error={new Error('Example error message')} reset={() => {}} />
};

export const ContextualFallbackStandalone: Story = {
  render: () => <ContextualErrorFallback error={new Error('Example error message')} reset={() => {}} label='sidebar' />
};
