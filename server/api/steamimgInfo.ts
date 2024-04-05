import { tables, useDrizzle } from "../utils/drizzle"

export default defineEventHandler(async (event) => {
  const config = await useRuntimeConfig()
  let mss = ""
  let statusCode = 200
  const session = await useSession(event,{
    password:config.SECRETKEY
  })
  let mqtt = (await useDrizzle().select().from(tables.mqtt).limit(1))
  let video = (await useDrizzle().select().from(tables.videos).limit(1))

     
    return {
      status:statusCode,
      mss,
      body:{
        mqtt,video
      }
    }
  })
  