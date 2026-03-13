import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    // shown when any component breaks
    if (hasError) {
      return (
        <div className='flex h-screen flex-col items-center justify-center px-4 text-center'>
          <div className='max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-lg'>
            <h2 className='text-xl font-semibold text-gray-800'>Something went wrong</h2>

            <p className='mt-2 text-gray-500 text-sm'>
              An unexpected error occurred. Please refresh the page or try again later.
            </p>

            <button
              onClick={() => window.location.reload()}
              className='mt-6 w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800'
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
