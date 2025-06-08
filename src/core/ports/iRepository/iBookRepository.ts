import { Book } from '@core/entities/book.entity';
import { CreateBookPayload, UpdateBookPayload } from '../payloads/book.payload';

interface IBookRepository {
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  save(book: CreateBookPayload): Promise<Book>;
  delete(id: string): Promise<void>;
  update(id: string, book: UpdateBookPayload): Promise<Book | null>;
}

export default IBookRepository;
