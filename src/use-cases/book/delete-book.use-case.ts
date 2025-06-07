import { container } from 'tsyringe';
import Logger from '../../core/ports/logger.port';
import IBookRepository from '../../core/ports/iRepository/iBookRepository';

class DeleteBookUseCase {
  private bookRepository: IBookRepository;
  private logger: Logger;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<IBookRepository>('IBookRepository');
  }

  async execute(bookId: string): Promise<void> {
    this.logger.debug(`Executing DeleteBook use case for bookId: ${bookId}`);

    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      this.logger.error(`Book with id ${bookId} not found`);
      throw new Error(`Book with id ${bookId} not found`);
    }

    await this.bookRepository.delete(bookId);
    this.logger.info(`Book with id ${bookId} deleted successfully`);

    return;
  }
}

export default DeleteBookUseCase;
