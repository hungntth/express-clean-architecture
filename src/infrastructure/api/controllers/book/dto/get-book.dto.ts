import { z } from 'zod';
import { BookDTO } from './book.dto';

// Zod schema
export const GetBookDTO = BookDTO;
export const GetBooksDTO = z.array(GetBookDTO);
export const BookIdDTO = z.string().uuid();

// TypeScript types for TSOA
export interface GetBookDTOModel {
  // Khai báo các trường giống BookDTO
  id: string;
  title: string;
  summary: string;
  author: string;
  totalPages: number;
}

export type GetBooksDTOModel = GetBookDTOModel[];
