import { randomUUID } from 'crypto';
import 'reflect-metadata';
import { container } from 'tsyringe';
import IBookRepository from '../src/core/ports/iRepository/iBookRepository';
import { CreateBookPayload } from '../src/core/ports/payloads/book.payload';
import CreateBookUseCase from '../src/core/use-cases/create-book.use-case';

describe('CreateBook', () => {
  const id: string = randomUUID();

  const mock__data: CreateBookPayload = {
    title: 'Book One',
    summary: 'Author A',
    author: 'Author A',
    totalPages: 300,
  };

  const mock__save = jest.fn();
  const mock__BookRepository = () => {
    return {
      save: mock__save,
    };
  };

  container.register<Partial<IBookRepository>>('IBookRepository', {
    useValue: mock__BookRepository(),
  });

  container.register('Logger', {
    useValue: {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
    },
  });

  // Test cases go here
  it('should get a book by ID', async () => {
    mock__save.mockResolvedValue(mock__data);

    const response = await new CreateBookUseCase().execute(mock__data);
    expect(response).toStrictEqual(mock__data);
    expect(
      container.resolve<IBookRepository>('IBookRepository').save,
    ).toHaveBeenCalledWith(mock__data);
  });
});
