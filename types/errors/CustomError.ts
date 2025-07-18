/**
 * Base interface for error context that all custom errors should extend
 */
export interface BaseErrorContext {
  readonly timestamp?: string;
  readonly originalError?: Error | unknown;
  readonly stackTrace?: string;
  readonly [key: string]: unknown;
}

/**
 * Generic type for creating custom error contexts
 */
export type ErrorType<T extends string> = {
  readonly errorType: T;
};

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
 * Factory function to create custom error classes with specific context types
 */
export function createCustomErrorClass<TContext extends BaseErrorContext, TErrorType extends string = string>(
  errorClassName: string
) {
  return class CustomError extends Error {
    public context: TContext & ErrorType<TErrorType>;

    private readonly _originalStack: string;

    constructor(message: string, context: TContext & ErrorType<TErrorType>) {
      super(message);
      this.name = errorClassName;

      // Capture the original stack trace before it gets modified
      this._originalStack = this.stack || '';

      // Maintain proper stack trace for where error was thrown
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }

      // Combine original stack with context stack if available
      const contextStack = context.originalError ? captureFormattedStack(context.originalError) : '';

      this.context = {
        ...context,
        timestamp: context.timestamp || new Date().toISOString(),
        stackTrace: context.stackTrace || [this._originalStack, contextStack].filter(Boolean).join('\n\nCaused by: ')
      };
    }

    /**
     * Creates a new instance from an existing error
     */
    static fromError(error: unknown, additionalContext: Partial<TContext & ErrorType<TErrorType>>): CustomError {
      const isCustomError = error instanceof CustomError;
      const errorMessage = error instanceof Error ? error.message : String(error);

      const context = {
        ...(isCustomError ? error.context : {}),
        ...additionalContext,
        originalError: isCustomError ? error.context.originalError : error,
        timestamp: new Date().toISOString(),
        // Preserve existing stack trace if available
        stackTrace: isCustomError ? error.context.stackTrace : error instanceof Error ? error.stack : undefined
      } as TContext & ErrorType<TErrorType>;

      return new CustomError(errorMessage, context);
    }

    /**
     * Updates the error context while preserving stack traces
     */
    updateContext(newContext: Partial<TContext & ErrorType<TErrorType>>): this {
      this.context = {
        ...this.context,
        ...newContext,
        timestamp: new Date().toISOString(),
        // Preserve the existing stack trace
        stackTrace: this.context.stackTrace
      };
      x;

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
      return this._originalStack;
    }
  };
}
