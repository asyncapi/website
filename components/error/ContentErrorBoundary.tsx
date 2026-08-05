import type { ReactNode } from 'react';
import React from 'react';

import ContextualErrorFallback from './ContextualErrorFallback';
import ErrorBoundary from './ErrorBoundary';

interface IContentErrorBoundaryProps {
  // The content subtree to protect.
  children: ReactNode;

  // Short label describing the failed region, e.g. "article" or "page content".
  label?: string;
}

/**
 * @description Convenience boundary for page content regions. It renders the
 * lightweight ContextualErrorFallback so a crash inside the content keeps its
 * local recovery UI without taking over the surrounding layout shell.
 * @param {IContentErrorBoundaryProps} props - The content children and an optional label.
 */
export default function ContentErrorBoundary({
  children,
  label = 'content'
}: IContentErrorBoundaryProps): React.JSX.Element {
  return (
    <ErrorBoundary
      fallback={({ error, errorInfo, reset }) => (
        <ContextualErrorFallback error={error} errorInfo={errorInfo} reset={reset} label={label} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
