import { container } from 'tsyringe';
import Logger from '../ports/logger.port';
import { IBook } from '../interfaces/book.interface';
import IBookRepository from '../ports/iRepository/iBookRepository';

class GetBookUseCase {
  private bookRepository: IBookRepository;
  private logger: Logger;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<IBookRepository>('IBookRepository');
  }

  async execute(bookId: string): Promise<IBook | null> {
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
