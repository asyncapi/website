import Router from 'next/router';
import type { ErrorInfo } from 'react';
import React, { Component } from 'react';

import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorFallbackProps
} from '@/types/components/error/ErrorBoundaryProps';

import GlobalErrorFallback from './GlobalErrorFallback';

/**
 * @description Determine whether the ordered list of reset keys has changed
 * between two renders. A change triggers an automatic reset of the boundary.
 * @param {unknown[]} previous - The previous reset keys.
 * @param {unknown[]} next - The next reset keys.
 */
function haveResetKeysChanged(previous: unknown[] = [], next: unknown[] = []): boolean {
  if (previous.length !== next.length) return true;

  return previous.some((key, index) => !Object.is(key, next[index]));
}

/**
 * @description A reusable React error boundary that isolates rendering failures
 * in its subtree, keeps the surrounding layout shell interactive, and renders
 * an accessible recovery UI. It supports custom fallbacks, imperative resets via
 * `resetKeys`, and automatic recovery on route changes.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.reset = this.reset.bind(this);
  }

  /**
   * @description Update state so the next render shows the fallback UI.
   * @param {Error} error - The error thrown by a descendant component.
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidMount(): void {
    const { resetOnRouteChange = true } = this.props;

    if (resetOnRouteChange) {
      Router.events.on('routeChangeComplete', this.reset);
    }
  }

  /**
   * @description Log the caught error and forward it to the optional handler.
   * @param {Error} error - The error thrown by a descendant component.
   * @param {ErrorInfo} errorInfo - React error info with the component stack.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { onError } = this.props;

    this.setState({ errorInfo });
    onError?.(error, errorInfo);

    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { hasError } = this.state;
    const { resetKeys, resetOnRouteChange = true } = this.props;
    const prevResetOnRouteChange = prevProps.resetOnRouteChange ?? true;

    if (resetOnRouteChange !== prevResetOnRouteChange) {
      if (resetOnRouteChange) {
        Router.events.on('routeChangeComplete', this.reset);
      } else {
        Router.events.off('routeChangeComplete', this.reset);
      }
    }

    if (hasError && haveResetKeysChanged(prevProps.resetKeys, resetKeys)) {
      this.reset();
    }
  }

  componentWillUnmount(): void {
    Router.events.off('routeChangeComplete', this.reset);
  }

  /**
   * @description Clear the error state so the protected subtree re-mounts.
   */
  reset(): void {
    const { hasError } = this.state;
    const { onReset } = this.props;

    if (!hasError) return;

    this.setState({ hasError: false, error: null, errorInfo: null });
    onReset?.();
  }

  render(): React.ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (!hasError) return children;

    const fallbackProps: ErrorFallbackProps = { error, errorInfo, reset: this.reset };

    if (typeof fallback === 'function') {
      return fallback(fallbackProps);
    }

    if (fallback !== undefined && fallback !== null) {
      return fallback;
    }

    return <GlobalErrorFallback {...fallbackProps} />;
  }
}
