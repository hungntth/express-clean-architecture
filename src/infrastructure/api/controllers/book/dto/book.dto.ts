import { z } from 'zod';

export const BookDTO = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  summary: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  totalPages: z.number().min(1).max(255),
});
