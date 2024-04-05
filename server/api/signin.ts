import { tables, useDrizzle } from "../utils/drizzle"

export default defineEventHandler(async (event) => {
  const session = await useSession(event,{
    password:"ao".repeat(16)
  })
  const users = await useDrizzle().select().from(tables.users).limit(0)
    return {
      hello: 'world',
      query:getQuery(event),
      session,
      users
    }
  })
  