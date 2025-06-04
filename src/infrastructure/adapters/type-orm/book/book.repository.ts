import { IBook } from '../../../../core/interfaces/book.interface';
import { BookRepository } from '../../../../core/ports/iRepository/IBookRepository';
import { AppDataSource, isInitialized } from '../data-source';
import BookEntity from './book.entity';

class TypeOrmRepository implements BookRepository {
  async findById(id: string): Promise<IBook | null> {
    await isInitialized();

    const book = await AppDataSource.getRepository(BookEntity).findOne({
      where: { id },
    });

    return book ? book.mapperDomainEntity() : null;
  }

  async findAll(): Promise<IBook[]> {
    await isInitialized();

    const books = await AppDataSource.getRepository(BookEntity).find();
    return books.map((book) => book.mapperDomainEntity());
  }

  async save(book: IBook): Promise<IBook> {
    const bookEntity = new BookEntity();
    Object.assign(bookEntity, book);
    const savedBook = await AppDataSource.getRepository(BookEntity).save(
      bookEntity,
    );
    return savedBook.mapperDomainEntity();
  }

  async delete(id: string): Promise<void> {
    await AppDataSource.getRepository(BookEntity).delete(id);
  }
}
