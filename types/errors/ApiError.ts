import type { BaseErrorContext } from './CustomError';
import { createCustomErrorClass } from './CustomError';

/**
 * Possible error types for API errors
 */
export type ApiErrorType =
  | 'validation_error'
  | 'authentication_error'
  | 'authorization_error'
  | 'not_found_error'
  | 'server_error';

/**
 * User information context for API errors
 */
export interface ApiUserInfo {
  readonly id?: string;
  readonly role?: string;
}

/**
 * Context specific to API errors
 */
export interface ApiErrorContext extends BaseErrorContext {
  readonly statusCode: number;
  readonly endpoint?: string;
  readonly method?: string;
  readonly requestId?: string;
  readonly userInfo?: ApiUserInfo;
}

/**
 * Custom error class for API-related errors
 */
export const ApiError = createCustomErrorClass<ApiErrorContext, ApiErrorType>('ApiError');
