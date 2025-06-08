import { Book } from '@core/entities/book.entity';
import { container, inject } from 'tsyringe';
import IBookRepository from '../../ports/iRepository/iBookRepository';
import ILogger from '../../ports/logger.port';

class GetBookUseCase {
  private bookRepository: IBookRepository;
  private logger: ILogger;

  constructor() {
    this.logger = container.resolve<ILogger>('ILogger');
    this.bookRepository = container.resolve<IBookRepository>('IBookRepository');
  }

  async execute(bookId: string): Promise<Book | null> {
    this.logger.debug(`Executing GetBook use case for bookId: ${bookId}`);

    const book = await this.bookRepository.findById(bookId);

    if (!book) {
      this.logger.error(`Book with id ${bookId} not found`);
      throw new Error(`Book with id ${bookId} not found`);
    }

    return book;
  }
}

export default GetBookUseCase;
