import React from 'react';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  State
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-red-50 text-red-800">
          <h1 className="text-2xl font-semibold mb-4">Something went wrong.</h1>
          <p className="mb-6 max-w-md text-center">
            An unexpected error occurred while rendering this page. Please try refreshing the page.
          </p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
