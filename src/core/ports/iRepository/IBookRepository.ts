import { IBook } from '../../interfaces/book.interface';

export interface BookRepository {
  findById(id: string): Promise<IBook | null>;
  findAll(): Promise<IBook[]>;
  save(book: IBook): Promise<IBook>;
  delete(id: string): Promise<void>;
}
