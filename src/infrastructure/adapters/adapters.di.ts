import { container } from 'tsyringe';
import {
  LogLevel,
  WinstonLogger,
} from './winston-logger/winston-logger.adapter';
import winstonLoggerConfig from './winston-logger/winston-logger.config';
import { BookRepository } from '../../core/ports/iRepository/IBookRepository';
import Logger from '../../core/ports/logger.port';

import TypeORMBookRepository from './type-orm/book/book.repository';

container
  .register<Logger>('Logger', {
    useValue: new WinstonLogger(winstonLoggerConfig.logLevel as LogLevel),
  })
  .register<BookRepository>('BookRepository', {
    useValue: new TypeORMBookRepository(),
  });
