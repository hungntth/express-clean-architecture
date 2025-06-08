import { Book } from '@core/entities/book.entity';
import { container } from 'tsyringe';
import IBookRepository from '../../ports/iRepository/iBookRepository';
import ILogger from '../../ports/logger.port';
import { CreateBookPayload } from '../../ports/payloads/book.payload';

class CreateBookUseCase {
  private bookRepository: IBookRepository;
  private logger: ILogger;

  constructor() {
    this.logger = container.resolve<ILogger>('ILogger');
    this.bookRepository = container.resolve<IBookRepository>('IBookRepository');
  }

  async execute(bookData: CreateBookPayload): Promise<Book> {
    this.logger.debug('Executing CreateBook use case');

    const book = await this.bookRepository.save(bookData);
    this.logger.info(`Book with id ${book.id} created successfully`);

    return book;
  }
}

export default CreateBookUseCase;
