import { tables, useDrizzle } from "../../utils/drizzle";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const params = getQuery(event);
  const session = await useSession(event, {
    password: config.SECRETKEY,
  });
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  console.log(session.data);
  if (session.data.acc.username === "admin") {
    if ("stream_id" in params && "app" in params && "ban" in params) {
      $fetch(`${config.DOCKER_INGEST_URI}/control/drop/publisher`, {
        query: {
          app: params.app,
          name: params.stream_id,
        },
      }).then(async (res) => {
        if (res === 1) {
          if (params.ban === "true" && params.app !== "live") {
            await useDrizzle()
              .update(tables.videos)
              .set({
                stream_id: Array.from(
                  crypto.getRandomValues(new Uint32Array(8))
                )
                  .map((x) => characters[x % characters.length])
                  .join(""),
                stream_key: Array.from(
                  crypto.getRandomValues(new Uint32Array(20))
                )
                  .map((x) => characters[x % characters.length])
                  .join(""),
              })
              .where(eq(tables.videos.id, 1));
            return {
              status: 200,
              mss: "Stream dropped and banned successfully",
            };
          }
          return {
            status: 200,
            mss: "Stream dropped successfully",
          };
        }
        return {
          status: 500,
          mss: "Stream dropped failure",
        };
      });
    } else {
      throw createError({ status: 400, message: "Invalid Payload" });
    }
  } else {
    throw createError({ status: 403, message: "You're not authrorized" });
  }
});
