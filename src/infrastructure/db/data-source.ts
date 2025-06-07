import { z } from 'zod';
import notTypeSafeConfig from './type-orm.config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import BookEntity from './book/book.entity';

import migrations from './migrations';

const ConfigSchema = z.object({
  host: z.string().min(2).max(100),
  port: z.number().min(1).max(65_535),
  username: z.string().min(2).max(100),
  password: z.string().min(6).max(100),
  database: z.string().min(2).max(100),
  dev: z.enum(['true', 'false']).transform((val) => val === 'true'),
  debug: z.enum(['true', 'false']).transform((val) => val === 'true'),
});

const config = ConfigSchema.parse(notTypeSafeConfig);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  // entities: ['src/infrastructure/adapters/type-orm/**/*.entity.ts'],
  entities: [BookEntity],
  migrations,
  migrationsRun: true,
  synchronize: config.dev,
  logging: config.debug,
  namingStrategy: new SnakeNamingStrategy(),
});

export const isInitialized = async (): Promise<boolean> => {
  if (AppDataSource.isInitialized) {
    return Promise.resolve(true);
  }
  return AppDataSource.initialize()
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false));
};
