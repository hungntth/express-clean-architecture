import winston, { format, transports, createLogger } from 'winston';
import Logger from '@core/ports/logger.port';

export type LogLevel =
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

export class WinstonLogger implements Logger {
  private logger: winston.Logger;

  constructor(logLevel: LogLevel) {
    this.logger = createLogger({
      level: logLevel,
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${level}]: ${message}`;
        }),
      ),
      transports: [new transports.Console()],
    });
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warning(message: string): void {
    this.logger.warn(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
