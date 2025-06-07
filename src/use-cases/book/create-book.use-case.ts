import { container } from 'tsyringe';
import IBookRepository from '../../core/ports/iRepository/iBookRepository';
import Logger from '../../core/ports/logger.port';
import { IBook } from '../../core/interfaces/book.interface';
import { CreateBookPayload } from '../../core/ports/payloads/book.payload';

class CreateBookUseCase {
  private bookRepository: IBookRepository;
  private logger: Logger;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<IBookRepository>('IBookRepository');
  }

  async execute(bookData: CreateBookPayload): Promise<IBook> {
    this.logger.debug('Executing CreateBook use case');

    const book = await this.bookRepository.save(bookData);
    this.logger.info(`Book with id ${book.id} created successfully`);

    return book;
  }
}

export default CreateBookUseCase;
