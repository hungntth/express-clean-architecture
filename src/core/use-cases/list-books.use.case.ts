import { container } from 'tsyringe';
import Logger from '../ports/logger.port';
import { IBook } from '../interfaces/book.interface';
import IBookRepository from '../ports/iRepository/iBookRepository';

class ListBooksUseCase {
  private bookRepository: IBookRepository;
  private logger: Logger;
  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<IBookRepository>('IBookRepository');
  }

  async execute(): Promise<IBook[]> {
    this.logger.debug('Executing ListBooks use case');

    return this.bookRepository.findAll();
  }
}

export default ListBooksUseCase;
