export type CreateBookPayload = {
  title: string;
  summary: string;
  author: string;
  totalPages: number;
};

export type UpdateBookPayload = {
  id: string;
  title?: string;
  summary?: string;
  author?: string;
  totalPages?: number;
};
