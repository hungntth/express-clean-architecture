import { BookIdDTO } from './dto';
import { PostBookInputDTO } from './dto/post-book.dto';

export const getBookCodec = {
  decodeBookId: (params: unknown) => BookIdDTO.safeParse(params),
};

export const createBookCodec = {
  decode: (params: unknown) => PostBookInputDTO.safeParse(params),
};
