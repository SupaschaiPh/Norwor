export default defineEventHandler(async(event)=>{
    const config = await useRuntimeConfig()
    const session = await useSession(event,{
        password:config.SECRETKEY
      })
    return {

    }
}
)
