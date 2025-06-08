import { container } from 'tsyringe';

import ILogger from '@core/ports/logger.port';
import {
  LogLevel,
  WinstonLogger,
} from '../winston-logger/winston-logger.adapter';
import winstonLoggerConfig from '../winston-logger/winston-logger.config';
import IBookRepository from '../../core/ports/iRepository/iBookRepository';
import BookRepositoryORM from '../db/book/book.repository';

container
  .register<ILogger>('ILogger', {
    useValue: new WinstonLogger(winstonLoggerConfig.logLevel as LogLevel),
  })
  .register<IBookRepository>('IBookRepository', {
    useValue: new BookRepositoryORM(),
  });
