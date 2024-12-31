const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'error', // minimum level of messages logger will handle
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ],
});

module.exports = logger;