import { env } from 'node:process';

export default {
  host: env['DB_HOST'],
  port: Number(env['DB_PORT']),
  username: env['DB_USERNAME'],
  password: env['DB_PASSWORD'],
  database: env['DB_NAME'],
  dev: env['DB_DEV'],
  debug: env['DB_DEBUG'],
};
