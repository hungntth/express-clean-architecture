import 'reflect-metadata';
import { randomUUID } from 'crypto';
import { IBook } from '../src/core/interfaces/book.interface';
import { container } from 'tsyringe';
import IBookRepository from '../src/core/ports/iRepository/iBookRepository';
import GetBookUseCase from '../src/core/use-cases/get-book.use-case';

describe('GetBook', () => {
  const id: string = randomUUID();

  const mock__data: IBook = {
    id,
    title: 'Book One',
    summary: 'Author A',
    author: 'Author A',
    totalPages: 300,
  };

  const mock__findById = jest.fn();
  const mock__BookRepository = () => {
    return {
      findById: mock__findById,
    };
  };

  container.register<Partial<IBookRepository>>('IBookRepository', {
    useValue: mock__BookRepository(),
  });

  container.register('Logger', {
    useValue: {
      debug: jest.fn(),
      error: jest.fn(),
    },
  });

  // Test cases go here
  it('should get a book by ID', async () => {
    mock__findById.mockResolvedValue(mock__data);

    const response = await new GetBookUseCase().execute(id);
    expect(response).toStrictEqual(mock__data);
    expect(
      container.resolve<IBookRepository>('IBookRepository').findById,
    ).toHaveBeenCalledWith(id);
  });

  it('should get a book by ID', async () => {
    mock__findById.mockResolvedValue(null);

    // Bắt throw đừng để await
    const response = new GetBookUseCase().execute(id);
    // Test cases go here
    await expect(response).rejects.toThrow(`Book with id ${id} not found`);
  });
});
