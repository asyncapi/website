import { type BaseErrorContext, createCustomErrorClass } from './CustomError';

/**
 * Possible error types for runner errors
 */
export type RunnerErrorType = 'script_level_error' | 'runner_level_error';

/**
 * Context specific to runner errors
 */
export interface RunnerErrorContext extends BaseErrorContext {
  readonly operation?: string;
  readonly runner?: string;
  readonly script?: string;
  readonly task?: string;
  readonly note?: string;
}

/**
 * Custom error class for runner-related errors
 */
export const RunnerError = createCustomErrorClass<RunnerErrorContext, RunnerErrorType>('RunnerError');
