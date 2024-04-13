
function getUrlParams(url: string): { [key: string]: string } {
    const queryString = url.split('?')[1];
    const params: { [key: string]: string } = {};
  
    if (queryString) {
      queryString.split('&').forEach(paramPair => {
        const [key, value] = paramPair.split('=');
        params[key] = value;
      });
    }
  
    return params;
  }

export default defineEventHandler(async (event) => {
    console.log(event.toString())
    const body = await readBody(event).catch(() => {
        throw createError({
            status: 500,
            message: "A server-side error occured",
          });
    })

    if (!("app" in body && "tcurl" in body && "name" in body)) {
        throw createError({
            status: 400,
            message: "Invalid Payload"
        })
    }

    const app_name = body.app
    const stream_id = body.name
    const urlParams = getUrlParams(body.tcurl)
    console.log(body, app_name, urlParams)

    if (app_name === "ingest" && "key" in urlParams) {
        console.log(urlParams.key)
        return { status: 200, message: "" }
    }

    throw createError({
        status: 400,
        message: "An error occured",
      });
})