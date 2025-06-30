import winston from 'winston';

const { combine, timestamp, printf, colorize, align, errors } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ level: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    align(),
    errors({ stack: false }),
    printf((info) => {
      const { timestamp, level, message, error, ...meta } = info;
      
      if (error) {
        // Format error details
        let errorDetails = '';
        if (error instanceof Error) {
          errorDetails = `\n${error.stack || ''}`;
        } else {
          errorDetails = JSON.stringify(error);
        }
        
        // Format metadata as clean JSON
        const metaStr = Object.keys(meta).length > 0 
          ? `\n${JSON.stringify(meta, null, 2)}`
          : '';
        
        return `[${timestamp}] ${level}: ${message}\n${errorDetails}${metaStr}`;
      }
      
      // Regular message with metadata
      const metaStr = Object.keys(meta).length > 0 
        ? `\n${JSON.stringify(meta, null, 2)}`
        : '';
      
      return `[${timestamp}] ${level}: ${message}${metaStr}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

export { logger };
