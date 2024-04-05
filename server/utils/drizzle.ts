import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3';
export { sql, eq, and, or } from 'drizzle-orm'
import path from 'path';
import * as schema from '../database/schema'
import { getDirectory } from 'nuxt/kit';

export const tables = schema

export function useDrizzle() {
  const __dirname = path.resolve();
  const sqlite = new Database(path.join(__dirname,'server/database/db.db'));
  
  return drizzle(sqlite, { schema })
}

export type User = typeof schema.users.$inferSelect
