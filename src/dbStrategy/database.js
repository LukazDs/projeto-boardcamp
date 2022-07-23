import dotenv from 'dotenv';

dotenv.config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { connection };
