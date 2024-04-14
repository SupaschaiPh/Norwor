export default defineEventHandler(async (event)=>{
    const config = useRuntimeConfig()
    const session = await useSession(event,{
        password:config.SECRETKEY
      })
    return {
      acc:session.data.acc
    }
}
)
