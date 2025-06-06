import { container } from 'tsyringe';
import {
  LogLevel,
  WinstonLogger,
} from './winston-logger/winston-logger.adapter';
import winstonLoggerConfig from './winston-logger/winston-logger.config';
import Logger from '../../core/ports/logger.port';

import BookRepositoryORM from './type-orm/book/book.repository';
import IBookRepository from '../../core/ports/iRepository/IBookRepository';

container
  .register<Logger>('Logger', {
    useValue: new WinstonLogger(winstonLoggerConfig.logLevel as LogLevel),
  })
  .register<IBookRepository>('IBookRepository', {
    useValue: new BookRepositoryORM(),
  });
