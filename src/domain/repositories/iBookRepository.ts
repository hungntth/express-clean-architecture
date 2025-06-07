import { IBook } from '../../interfaces/book.interface';
import { CreateBookPayload, UpdateBookPayload } from '../payloads/book.payload';

interface IBookRepository {
  findById(id: string): Promise<IBook | null>;
  findAll(): Promise<IBook[]>;
  save(book: CreateBookPayload): Promise<IBook>;
  delete(id: string): Promise<void>;
  update(id: string, book: UpdateBookPayload): Promise<IBook | null>;
}

export default IBookRepository;
