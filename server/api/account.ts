import { tables, useDrizzle } from "../utils/drizzle"

export default defineEventHandler(async (event) => {
  const config = await useRuntimeConfig()
  let mss = ""
  let statusCode = 404
  const body = await readBody(event).catch(() => {})
  const session = await useSession(event,{
    password:config.SECRETKEY
  })
  let users = await useDrizzle().select().from(tables.users).all()
     
  
    return {
      status:statusCode,
      mss
    }
  })
  