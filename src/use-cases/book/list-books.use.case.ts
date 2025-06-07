import { container } from 'tsyringe';
import Logger from '../../core/ports/logger.port';
import { IBook } from '../../core/interfaces/book.interface';
import IBookRepository from '../../core/ports/iRepository/iBookRepository';

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
