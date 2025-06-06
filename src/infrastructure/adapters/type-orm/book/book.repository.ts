import { IBook } from '../../../../core/interfaces/book.interface';
import IBookRepository from '../../../../core/ports/iRepository/IBookRepository';
import {
  CreateBookPayload,
  UpdateBookPayload,
} from '../../../../core/ports/payloads/book.payload';
import { AppDataSource, isInitialized } from '../data-source';
import BookEntity from './book.entity';

class BookRepositoryORM implements IBookRepository {
  async findById(id: string): Promise<IBook | null> {
    await isInitialized();

    const book = await AppDataSource.getRepository(BookEntity).findOne({
      where: { id },
    });

    return book ? book.mapperDomainEntity() : null;
  }

  async findAll(): Promise<IBook[]> {
    await isInitialized();
    console.log('test');
    const books = await AppDataSource.getRepository(BookEntity).find();
    return books.map((book) => book.mapperDomainEntity());
  }

  async save(payload: CreateBookPayload): Promise<IBook> {
    const bookEntity = new BookEntity();
    Object.assign(bookEntity, payload);
    const savedBook = await AppDataSource.getRepository(BookEntity).save(
      bookEntity,
    );
    return savedBook.mapperDomainEntity();
  }

  async delete(id: string): Promise<void> {
    await AppDataSource.getRepository(BookEntity).delete(id);
  }

  async update(id: string, payload: UpdateBookPayload): Promise<IBook | null> {
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
    return updatedBook.mapperDomainEntity();
  }
}

export default BookRepositoryORM;
