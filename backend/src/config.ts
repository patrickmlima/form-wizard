import path from 'path';
import dotenv from 'dotenv';

const env = process.env['NODE_ENV'];
const envFilePath = path.join(process.cwd(), 'environments', `.env.${env}`);
dotenv.config({ path: envFilePath });

export const appConfig = {
  server: {
    host: process.env['APP_HOST'] ?? '127.0.0.1',
    port: process.env['APP_PORT'] ?? 3000,
  },
  db: {
    dbHost: process.env['DB_HOST'],
    dbPort: process.env['DB_PORT'],
    dbName: process.env['DB_NAME'],
    dbUser: process.env['DB_USER'],
    dbPassword: process.env['DB_PASSWORD'],
  },
};
