import { z } from 'zod';

export const CreateBookSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  summary: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  totalPages: z.number().min(1).max(255),
});

export const GetBookSchema = z.string().uuid();

export interface CreateBookDto {
  id: string;
  title: string;
  summary: string;
  author: string;
  totalPages: number;
}

export interface GetBookDto {
  id: string;
}
