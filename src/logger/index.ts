import { createLogger, format, transports, addColors } from 'winston';

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  silly: 'magenta',
});

export const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`
    }),
  ),
  transports: [
    new transports.Console(),
  ]
});
