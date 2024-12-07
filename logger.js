const { createLogger, format, transports } = require('winston');
const winstonTimestampColorize = require('winston-timestamp-colorize');

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
  winstonTimestampColorize(), 
  format.colorize({all:true}), 
  format.printf(({ level, timestamp, message, stack, tool_name, url }) => {
  
    let logMessage = `${level} at ${timestamp}`;
    logMessage += `\n${message}`;
      if (tool_name) {
        logMessage += `\n   Tool: ${tool_name}`;
      }
      if (url) {
        logMessage += `\n   URL: ${url}`;
      }
      if (stack) {
        logMessage += `\n   Stack: ${stack}`;
      }
      return logMessage;
  }),

);

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.Console({
      format: format.combine(customFormat)  
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;
