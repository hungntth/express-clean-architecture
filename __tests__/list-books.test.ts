import 'reflect-metadata';
import { randomUUID } from 'crypto';
import { IBook } from '../src/core/interfaces/book.interface';
import ListBooksUseCase from '../src/core/use-cases/book/list-books.use.case';
import { container } from 'tsyringe';
import IBookRepository from '../src/core/ports/iRepository/iBookRepository';

describe('ListBooks', () => {
  const mock__data: IBook[] = [
    {
      id: randomUUID(),
      title: 'Book One',
      summary: 'Author A',
      author: 'Author A',
      totalPages: 300,
    },
    {
      id: randomUUID(),
      title: 'Book Two',
      summary: 'Author B',
      author: 'Author B',
      totalPages: 250,
    },
  ];

  const mock__findAll = jest.fn();
  const mock__BookRepository = () => {
    return {
      findAll: mock__findAll,
    };
  };

  container.register<Partial<IBookRepository>>('IBookRepository', {
    useValue: mock__BookRepository(),
  });

  container.register('Logger', {
    useValue: {
      debug: jest.fn(),
    },
  });

  // Test cases go here
  it('should list all books', async () => {
    mock__findAll.mockResolvedValue(mock__data);

    const response = await new ListBooksUseCase().execute();
    expect(response).toStrictEqual(mock__data);
    expect(
      container.resolve<IBookRepository>('IBookRepository').findAll,
    ).toHaveBeenCalled();
  });
});
