import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Top-level ErrorBoundary for the AsyncAPI website.
 *
 * Wrapping the whole app in <ErrorBoundary> at the layout level means a render
 * error in any descendant component (e.g. a future page, a broken MDX block)
 * no longer tears down the whole site — it just shows a small recoverable
 * fallback so navigation still works.
 *
 * See: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        // Surface the error to the browser console; in production a real Sentry
        // hook would go here.
        // eslint-disable-next-line no-console
        console.error('[ErrorBoundary] Caught a render error:', error, info);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (
                <div role="alert" style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
                    <h1>Something went wrong.</h1>
                    <p>Please refresh the page, or use the navigation to continue.</p>
                </div>
            );
        }
        return this.props.children;
    }
}
