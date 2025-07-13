import winston from 'winston';

import { RunnerError } from '@/types/errors/RunnerError';

const { combine, timestamp: timestampFn, printf, colorize, align, errors } = winston.format;

interface CustomErrorMeta {
  errorType?: string;
  operation?: string;
  runner?: string;
  script?: string;
  task?: string;
  note?: string;
  context?: Record<string, unknown>;
  configuration?: Record<string, unknown>;
}

/**
 * Format error details based on error type
 */
function formatErrorDetails(error: unknown): string {
  if (error instanceof RunnerError) {
    const { context } = error;
    const stackTrace = error.getFullStack();

    return [
      `Error Type: ${context.errorType}`,
      `Operation: ${context.operation}`,
      `Runner: ${context.runner}`,
      `Script: ${context.script}`,
      `Task: ${context.task}`,
      context.note ? `Note: ${context.note}` : null,
      context.context ? `Context:\n${JSON.stringify(context.context, null, 2)}` : null,
      stackTrace ? `Stack Trace:\n${stackTrace}` : null
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
  const excludeFields = ['errorType', 'operation', 'runner', 'script', 'task', 'note', 'context', 'configuration'];

  const filteredMeta = Object.entries(meta)
    .filter(([key]) => !excludeFields.includes(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return Object.keys(filteredMeta).length > 0 ? `\nAdditional Metadata:\n${JSON.stringify(filteredMeta, null, 2)}` : '';
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ level: true }),
    timestampFn({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    align(),
    errors({ stack: false }), // Disable winston's stack handling as we handle it ourselves
    printf((info) => {
      const { timestamp, level, message, error, ...meta } = info as winston.LogEntry & CustomErrorMeta;

      if (error) {
        const errorDetails = formatErrorDetails(error);
        const metaStr = formatMetadata(meta);

        return `[${timestamp}] ${level}: ${message}\n${errorDetails}${metaStr}`;
      }

      const metaStr = formatMetadata(meta);

      return `[${timestamp}] ${level}: ${message}${metaStr}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

export { logger };
