import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { CreateBookPayload } from '../../core/ports/payloads/book.payload';
import CreateBookUseCase from '../../use-cases/book/create-book.use-case';
import DeleteBookUseCase from '../../use-cases/book/delete-book.use-case';
import GetBookUseCase from '../../use-cases/book/get-book.use-case';
import ListBooksUseCase from '../../use-cases/book/list-books.use.case';
import { createBookCodec, getBookCodec } from '../../infrastructure/api/controllers/book/book.codec';
import { GetBookDTOModel, GetBooksDTOModel, PostBookDTOModel } from '../../infrastructure/api/controllers/book/dto';

@Route('books')
@Tags('Books')
@Security('jwt')

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
    return new ListBooksUseCase().execute();
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
    const book = await new GetBookUseCase().execute(bookId.data);

    if (!book) {
      throw 'Book not found';
    }

    return book;
  }

  /**
   * @summary Create a new book
   * @param payload - The book data to create
   * @returns The created book
   */
  @Post()
  @SuccessResponse(201)
  async create(@Body() payload: CreateBookPayload): Promise<PostBookDTOModel> {
    const decodingResuilt = createBookCodec.decode(payload);

    if (!decodingResuilt.success) {
      throw 'Invalid book data';
    }
    // Simulating book creation
    return await new CreateBookUseCase().execute(decodingResuilt.data);
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
    await new DeleteBookUseCase().execute(bookId.data);
    // Simulating book deletion
    return;
  }
}
