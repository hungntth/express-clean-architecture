import IBookRepository from '../../../core/ports/iRepository/iBookRepository';
import {
  CreateBookPayload,
  UpdateBookPayload,
} from '../../../core/ports/payloads/book.payload';
import { AppDataSource, isInitialized } from '../data-source';
import BookEntity from './book.entity';
import { Book } from '../../../core/entities/book.entity';

class BookRepositoryORM implements IBookRepository {
  async findById(id: string): Promise<Book | null> {
    await isInitialized();

    const book = await AppDataSource.getRepository(BookEntity).findOne({
      where: { id },
    });

    return book ? Book.mapperDomainEntity(book) : null;
  }

  async findAll(): Promise<Book[]> {
    await isInitialized();
    console.log('test');
    const books = await AppDataSource.getRepository(BookEntity).find();
    return books.map((book) => Book.mapperDomainEntity(book));
  }

  async save(payload: CreateBookPayload): Promise<Book> {
    const bookEntity = new BookEntity();
    Object.assign(bookEntity, payload);
    const savedBook = await AppDataSource.getRepository(BookEntity).save(
      bookEntity,
    );
    return Book.mapperDomainEntity(savedBook);
  }

  async delete(id: string): Promise<void> {
    await AppDataSource.getRepository(BookEntity).delete(id);
  }

  async update(id: string, payload: UpdateBookPayload): Promise<Book | null> {
    await isInitialized();

    const book = await AppDataSource.getRepository(BookEntity).findOne({
      where: { id },
    });

    if (!book) {
      return null;
    }

    Object.assign(book, payload);
    const updatedBook = await AppDataSource.getRepository(BookEntity).save(
      book,
    );
    return Book.mapperDomainEntity(updatedBook);
  }
}

export default BookRepositoryORM;
