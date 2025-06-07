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
import { CreateBookPayload } from '../../../../core/ports/payloads/book.payload';
import CreateBookUseCase from '../../../../core/use-cases/create-book.use-case';
import DeleteBookUseCase from '../../../../core/use-cases/delete-book.use-case';
import GetBookUseCase from '../../../../core/use-cases/get-book.use-case';
import ListBooksUseCase from '../../../../core/use-cases/list-books.use.case';
import { createBookCodec, getBookCodec } from './book.codec';
import { GetBookDTOModel, GetBooksDTOModel, PostBookDTOModel } from './dto';

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
