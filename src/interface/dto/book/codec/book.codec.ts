import { CreateBookSchema, GetBookSchema } from '../request/book.request';

export const getBookCodec = {
  decodeBookId: (params: unknown) => GetBookSchema.safeParse(params),
};

export const createBookCodec = {
  decode: (params: unknown) => CreateBookSchema.safeParse(params),
};
