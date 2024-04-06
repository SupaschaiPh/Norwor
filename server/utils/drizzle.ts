import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3';
export { sql, eq, and, or } from 'drizzle-orm'

import path from 'path';
import * as schema from '../database/schema'
import { getDirectory } from 'nuxt/kit';

export const tables = schema

export function useDrizzle() {
  const __dirname = path.resolve();
  const config = useRuntimeConfig()
  console.log("Open data base at : ",config.DB_PATH!="" ? config.DB_PATH : path.join(__dirname,'server/database/db.db'))
  const sqlite = new Database( config.DB_PATH!="" ? config.DB_PATH : path.join(__dirname,'server/database/db.db'));
  const drizzleORM = drizzle(sqlite, { schema })
  /*migrate(drizzleORM,{
    migrationsFolder: path.join(__dirname,'./server/database/migrations')
  });*/
  return drizzleORM
}

export type User = typeof schema.users.$inferSelect
