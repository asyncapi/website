import type { ErrorInfo, ReactNode } from 'react';

/**
 * Props passed to a fallback component/render function when an error is caught.
 */
export interface ErrorFallbackProps {
  // The error that was thrown by a descendant component.
  error: Error | null;

  // React error info containing the component stack, when available.
  errorInfo?: ErrorInfo | null;

  // Resets the boundary so the children are re-mounted and re-rendered.
  reset: () => void;
}

/**
 * A fallback can either be a static React node or a render function that
 * receives the current error and the reset handler.
 */
export type ErrorFallback = ReactNode | ((props: ErrorFallbackProps) => ReactNode);

/**
 * Public props for the reusable ErrorBoundary component.
 */
export interface ErrorBoundaryProps {
  // The subtree protected by this boundary.
  children: ReactNode;

  // Fallback rendered when an error is caught. Accepts a React node or a render
  // function. Defaults to the full-page GlobalErrorFallback when omitted.
  fallback?: ErrorFallback;

  // Render the lightweight ContextualErrorFallback with this label instead of
  // the full-page GlobalErrorFallback, when no explicit `fallback` is provided.
  contextualLabel?: string;

  // Invoked with the error and error info whenever an error is caught.
  onError?: (error: Error, errorInfo: ErrorInfo) => void;

  // Invoked after the boundary state has been reset.
  onReset?: () => void;

  // When any value in this array changes while the boundary is in an error
  // state, the boundary automatically resets. Useful for tying recovery to
  // external state such as a query or an id.
  resetKeys?: unknown[];

  // Automatically reset the boundary when the user navigates to a new route.
  // Enabled by default so a crash never leaves the app permanently stuck.
  resetOnRouteChange?: boolean;
}

/**
 * Internal state for the ErrorBoundary component.
 */
export interface ErrorBoundaryState {
  // Whether a descendant has thrown during rendering.
  hasError: boolean;

  // The captured error, if any.
  error: Error | null;

  // The captured React error info, if any.
  errorInfo: ErrorInfo | null;
}
