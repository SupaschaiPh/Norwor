export default defineEventHandler(async (event) => {
    console.log(event.toString())
    const body = await readBody(event).catch(() => {})
    console.log(body)
    return {
        result: "Success"        
    }
})