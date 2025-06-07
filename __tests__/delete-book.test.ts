import { randomUUID } from 'crypto';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { IBook } from '../src/core/interfaces/book.interface';
import IBookRepository from '../src/core/ports/iRepository/iBookRepository';
import DeleteBookUseCase from '../src/core/use-cases/delete-book.use-case';

describe('DeleteBook', () => {
  const id: string = randomUUID();

  const mock__data: IBook = {
    id,
    title: 'Book One',
    summary: 'Author A',
    author: 'Author A',
    totalPages: 300,
  };

  const mock__delete = jest.fn();
  const mock__findById = jest.fn();
  const mock__BookRepository = () => {
    return {
      delete: mock__delete,
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
      info: jest.fn()
    },
  });

  // Test cases go here
  it('should delete a book by ID', async () => {
    mock__delete.mockResolvedValue(mock__data);
    mock__findById.mockResolvedValue(mock__data);

    await expect(new DeleteBookUseCase().execute(id)).resolves.toBeUndefined();
    expect(
      container.resolve<IBookRepository>('IBookRepository').delete,
    ).toHaveBeenCalledWith(id);
  });

  it('should delete a book by ID', async () => {
    mock__delete.mockResolvedValue(null);
    mock__findById.mockResolvedValue(null);

    // Bắt throw đừng để await
    const response = new DeleteBookUseCase().execute(id);
    // Test cases go here
    await expect(response).rejects.toThrow(`Book with id ${id} not found`);
  });
});
