const { createLogger, format, transports } = require('winston');

const env = process.env.NODE_ENV || 'development';
const filename = 'logs/error.log';

const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.printf((info) => `${info.level}: ${info.message}`)),
    }),
    new transports.File({ filename : filename }),
  ],
});

module.exports = logger;