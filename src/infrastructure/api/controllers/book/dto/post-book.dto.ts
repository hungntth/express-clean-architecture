import { BookDTO } from './book.dto';
import { z } from 'zod';

export const PostBookInputDTO = z.object({
  title: z.string().min(1).max(255),
  summary: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  totalPages: z.number().min(1).max(255),
});

// TypeScript type cho TSOA
export interface PostBookInputDTOModel {
  title: string;
  summary: string;
  author: string;
  totalPages: number;
}

export const PostBookDTO = BookDTO;

// TypeScript type cho TSOA
export interface PostBookDTOModel {
  id: string;
  title: string;
  summary: string;
  author: string;
  totalPages: number;
}
