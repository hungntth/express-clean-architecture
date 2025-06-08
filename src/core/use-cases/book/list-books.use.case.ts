import { Book } from '@core/entities/book.entity';
import { container } from 'tsyringe';
import IBookRepository from '../../ports/iRepository/iBookRepository';
import ILogger from '../../ports/logger.port';

class ListBooksUseCase {
  private bookRepository: IBookRepository;
  private logger: ILogger;

  constructor() {
    this.logger = container.resolve<ILogger>('ILogger');
    this.bookRepository = container.resolve<IBookRepository>('IBookRepository');
  }

  async execute(): Promise<Book[]> {
    this.logger.debug('Executing ListBooks use case');

    return this.bookRepository.findAll();
  }
}

export default ListBooksUseCase;
