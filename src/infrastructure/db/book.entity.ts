import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBook } from '@core/interfaces/book.interface';

@Entity('books')
export default class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  author: string;

  @Column()
  totalPages: number;

  @Column({
    type: 'time with time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  mapperDomainEntity(): IBook {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      author: this.author,
      totalPages: this.totalPages,
    };
  }
}
