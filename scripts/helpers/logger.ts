import winston from 'winston';

import { CustomError } from '@/types/errors/CustomError';

const { combine, timestamp: timestampFn, printf, colorize, align, errors } = winston.format;

/**
 * Extract structured error data from CustomError
 */
function extractErrorData(error: CustomError): Record<string, unknown> {
  const { context } = error;

  return {
    errorMessage: error.message,
    category: context.category,
    operation: context.operation,
    detail: context.detail,
    statusCode: context.statusCode,
    timestamp: context.timestamp,
    stackTrace: error.getFullStack()
  };
}

/**
 * Format error details for display
 */
function formatErrorDetails(error: unknown): string {
  if (error instanceof CustomError) {
    const errorData = extractErrorData(error);

    return [
      `Category: ${errorData.category}`,
      `Message: ${errorData.errorMessage}`,
      errorData.operation ? `Operation: ${errorData.operation}` : null,
      errorData.detail ? `Detail: ${errorData.detail}` : null,
      errorData.statusCode ? `Status Code: ${errorData.statusCode}` : null,
      errorData.timestamp ? `Timestamp: ${errorData.timestamp}` : null,
      errorData.stackTrace ? `Stack Trace:\n${errorData.stackTrace}` : null
    ]
      .filter(Boolean)
      .join('\n');
  }

  if (error instanceof Error) {
    return error.stack || error.message;
  }

  return JSON.stringify(error, null, 2);
}

/**
 * Format metadata excluding known error fields
 */
function formatMetadata(meta: Record<string, unknown>): string {
  const excludeFields = ['error', 'errorData'];

  const filteredMeta = Object.entries(meta)
    .filter(([key]) => !excludeFields.includes(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return Object.keys(filteredMeta).length > 0 ? `\nAdditional Metadata:\n${JSON.stringify(filteredMeta, null, 2)}` : '';
}

const baseLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ level: true }),
    timestampFn({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    align(),
    errors({ stack: false }), // Disable winston's stack handling as we handle it ourselves
    printf((info) => {
      const { timestamp, level, message, ...meta } = info as winston.LogEntry & Record<string, unknown>;

      // Check if there's an error in meta
      if (meta.error) {
        const errorDetails = formatErrorDetails(meta.error);
        const metaStr = formatMetadata(meta);

        return `[${timestamp}] ${level}: ${message}\n${errorDetails}${metaStr}`;
      }

      // Check if there's errorData in meta (structured CustomError data)
      if (meta.errorData) {
        const metaStr = formatMetadata(meta);

        return `[${timestamp}] ${level}: ${message}\nError Data: ${JSON.stringify(meta.errorData, null, 2)}${metaStr}`;
      }

      const metaStr = formatMetadata(meta);

      return `[${timestamp}] ${level}: ${message}${metaStr}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

/**
 * Enhanced logger with CustomError support
 */
export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => baseLogger.info(message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => baseLogger.warn(message, meta),
  debug: (message: string, meta?: Record<string, unknown>) => baseLogger.debug(message, meta),

  /**
   * Log an error - accepts either a string message with CustomError, or just a string with meta
   */
  error: (message: string, errorOrMeta?: CustomError | Record<string, unknown>) => {
    if (errorOrMeta instanceof CustomError) {
      // String message with CustomError - log as structured data
      const errorData = extractErrorData(errorOrMeta);

      baseLogger.error(message, {
        error: errorOrMeta,
        errorData
      });
    } else {
      // Regular error logging
      baseLogger.error(message, errorOrMeta as Record<string, unknown>);
    }
  }
};
