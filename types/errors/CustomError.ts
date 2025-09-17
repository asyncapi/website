/**
 * Error categories for different types of errors
 */
export type ErrorCategory = 'script' | 'api' | 'validation' | 'general';

/**
 * Simplified error context interface with only essential fields
 */
export interface ErrorContext {
  readonly category: ErrorCategory;
  readonly detail?: string;
  readonly operation?: string;
  readonly statusCode?: number;
  readonly timestamp?: string;
  readonly originalError?: Error | unknown;
  readonly stackTrace?: string;
}

/**
 * Captures a formatted stack trace from an error
 */
function captureFormattedStack(error: Error | unknown): string {
  if (error instanceof Error) {
    return error.stack || error.message;
  }

  return new Error('Unknown error').stack || '';
}

/**
 * Unified custom error class for all application errors
 */
export class CustomError extends Error {
  public context: ErrorContext;

  private readonly originalStack: string;

  constructor(message: string, context: ErrorContext) {
    super(message);
    this.name = 'CustomError';

    // Capture the original stack trace before it gets modified
    this.originalStack = this.stack || '';

    // Maintain proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Combine original stack with context stack if available
    const contextStack = context.originalError ? captureFormattedStack(context.originalError) : '';

    this.context = {
      ...context,
      timestamp: context.timestamp || new Date().toISOString(),
      stackTrace: context.stackTrace || [this.originalStack, contextStack].filter(Boolean).join('\n\nCaused by: ')
    };
  }

  /**
   * Creates a new instance from an existing error
   */
  static fromError(error: unknown, additionalContext: Partial<ErrorContext>): CustomError {
    const isCustomError = error instanceof CustomError;
    const errorMessage = error instanceof Error ? error.message : String(error);

    let existingStackTrace: string | undefined;

    if (isCustomError) {
      existingStackTrace = error.context.stackTrace;
    } else if (error instanceof Error) {
      existingStackTrace = error.stack;
    }

    const context: ErrorContext = {
      category: 'general',
      ...(isCustomError ? error.context : {}),
      ...additionalContext,
      originalError: isCustomError ? error.context.originalError : error,
      timestamp: new Date().toISOString(),
      stackTrace: existingStackTrace
    };

    return new CustomError(errorMessage, context);
  }

  /**
   * Updates the error context while preserving stack traces
   */
  updateContext(newContext: Partial<ErrorContext>): this {
    this.context = {
      ...this.context,
      ...newContext,
      timestamp: new Date().toISOString(),
      // Preserve the existing stack trace
      stackTrace: this.context.stackTrace
    };

    return this;
  }

  /**
   * Gets the complete stack trace including any caused by traces
   */
  getFullStack(): string {
    return this.context.stackTrace || this.stack || '';
  }

  /**
   * Gets the original stack trace from when the error was first created
   */
  getOriginalStack(): string {
    return this.originalStack;
  }

  /**
   * Convenience method to check if error is of a specific category
   */
  isCategory(category: ErrorCategory): boolean {
    return this.context.category === category;
  }

  /**
   * Convenience method to get a formatted error summary
   */
  getSummary(): string {
    const parts = [`Category: ${this.context.category}`, `Message: ${this.message}`];

    if (this.context.detail) {
      parts.push(`Detail: ${this.context.detail}`);
    }

    if (this.context.operation) {
      parts.push(`Operation: ${this.context.operation}`);
    }

    if (this.context.statusCode) {
      parts.push(`Status: ${this.context.statusCode}`);
    }

    return parts.join(' | ');
  }
}
