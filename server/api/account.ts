import { tables, useDrizzle } from "../utils/drizzle"

export default defineEventHandler(async (event) => {
  const config = await useRuntimeConfig()
  let mss = ""
  let statusCode = 200
  const session = await useSession(event,{
    password:config.SECRETKEY
  })
  let users = (await useDrizzle().select().from(tables.users).all()).map((v)=>{ v.password = "" ;return v})
     
    return {
      status:statusCode,
      mss,
      body:users
    }
  })
  