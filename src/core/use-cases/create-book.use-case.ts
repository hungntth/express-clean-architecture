import { container } from 'tsyringe';
import { BookRepository } from '../ports/iRepository/IBookRepository';
import Logger from '../ports/logger.port';
import { IBook } from '../interfaces/book.interface';

class CreateBookUseCase {
  private bookRepository: BookRepository;
  private logger: Logger;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<BookRepository>('BookRepository');
  }

  async execute(bookData: IBook): Promise<IBook> {
    this.logger.debug('Executing CreateBook use case');

    const book = await this.bookRepository.save(bookData);
    this.logger.info(`Book with id ${bookData.id} created successfully`);

    return book;
  }
}

export default CreateBookUseCase;
