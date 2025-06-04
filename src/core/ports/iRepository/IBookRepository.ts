import { IBook } from '../../interfaces/book.interface';
import { UpdateBookPayload } from '../payloads/book.payload';

export interface BookRepository {
  findById(id: string): Promise<IBook | null>;
  findAll(): Promise<IBook[]>;
  save(book: IBook): Promise<IBook>;
  delete(id: string): Promise<void>;
  update(id: string, book: UpdateBookPayload): Promise<IBook | null>;
}
