export class Book {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly summary: string,
    public readonly totalPages: number,
    public readonly createdAt: Date = new Date(),
  ) {}

  static mapperDomainEntity(book: Book): Book {
    return new Book(
      book.id,
      book.title,
      book.author,
      book.summary,
      book.totalPages,
      book.createdAt,
    );
  }
}
