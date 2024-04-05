import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  driver:"better-sqlite",
  dbCredentials: {
    url: './server/database/db.db', // 👈 this could also be a path to the local sqlite file
  }
})
