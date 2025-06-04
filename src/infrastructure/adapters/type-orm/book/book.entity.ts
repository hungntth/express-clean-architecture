import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
class Book {
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
}

export default Book;
