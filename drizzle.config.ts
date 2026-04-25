import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_6sLpQBok3OIi@ep-noisy-haze-adve53bl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
} satisfies Config;
