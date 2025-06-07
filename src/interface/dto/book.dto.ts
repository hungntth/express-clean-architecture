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
