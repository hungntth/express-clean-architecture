import { container } from 'tsyringe';
import Logger from '../ports/logger.port';
import { IBook } from '../interfaces/book.interface';
import { BookRepository } from '../ports/iRepository/IBookRepository';

class ListBooksUseCase {
  private bookRepository: BookRepository;
  private logger: Logger;
  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<BookRepository>('BookRepository');
  }

  async execute(): Promise<IBook[]> {
    this.logger.debug('Executing ListBooks use case');

    return this.bookRepository.findAll();
  }
}

export default ListBooksUseCase;
