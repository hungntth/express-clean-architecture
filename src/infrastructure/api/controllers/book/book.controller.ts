import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { v4 as uuidv4 } from 'uuid';
import { createBookCodec, getBookCodec } from './book.codec';
import {
  GetBookDTOModel,
  GetBooksDTOModel,
  PostBookDTO,
  PostBookDTOModel,
  PostBookInputDTO,
  PostBookInputDTOModel,
} from './dto';

@Route('books')
@Tags('Books')
/**
 * Book Controller
 */
export class BookController extends Controller {
  constructor() {
    super();
  }

  /**
   * @summary Get a list of books
   * @returns A list of books
   */
  @Get()
  @SuccessResponse(200)
  async list(): Promise<GetBooksDTOModel> {
    // Simulating a book list retrieval
    return [
      {
        id: '1',
        title: 'Book 1',
        summary: 'Summary 1',
        author: 'Author 1',
        totalPages: 100,
      },
      {
        id: '2',
        title: 'Book 2',
        summary: 'Summary 2',
        author: 'Author 2',
        totalPages: 200,
      },
      {
        id: '3',
        title: 'Book 3',
        summary: 'Summary 3',
        author: 'Author 3',
        totalPages: 300,
      },
    ];
  }

  /**
   * @summary Get a book by ID
   * @param id - The ID of the book
   * @returns The book with the specified ID
   */
  @Get('{id}')
  @SuccessResponse(200)
  async getById(@Path() id: string): Promise<GetBookDTOModel> {
    const bookId = getBookCodec.decodeBookId({ id });

    if (!bookId.success) {
      throw 'Invalid book ID';
    }
    // Simulating a book retrieval by ID
    return {
      id,
      title: `Book ${id}`,
      summary: `Summary ${id}`,
      author: `Author ${id}`,
      totalPages: 100,
    };
  }

  /**
   * @summary Create a new book
   * @param payload - The book data to create
   * @returns The created book
   */
  @Post()
  @SuccessResponse(201)
  async create(
    @Body() payload: PostBookInputDTOModel,
  ): Promise<PostBookDTOModel> {
    const decodingResuilt = createBookCodec.decode(payload);

    if (!decodingResuilt.success) {
      throw 'Invalid book data';
    }
    // Simulating book creation
    return { id: uuidv4(), ...payload };
  }

  /**
   * @summary Delete a book by ID
   * @param id - The ID of the book
   * @returns No content
   */
  @Delete('{id}')
  @SuccessResponse(204)
  async delete(@Path() id: string): Promise<void> {
    const bookId = getBookCodec.decodeBookId({ id });

    if (!bookId.success) {
      throw 'Invalid book ID';
    }

    // Simulating book deletion
    return;
  }
}
