import { tables, useDrizzle } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let mss = "";
  let statusCode = 200;
  const session = await useSession(event, {
    password: config.SECRETKEY,
  });

  if (event.method == "GET") {
    const params = getQuery(event)
    let mqtt = await useDrizzle().select().from(tables.mqtt).limit(1);
    if (!params.mqtt) {
      let video = await useDrizzle().select().from(tables.videos).limit(1);
      return {
        status: statusCode,
        mss,
        body: {
          mqtt: mqtt[0],
          video: video[0],
        }
      }
    } else {
      return {
        status: statusCode,
        mss,
        body: {
          mqtt: mqtt[0],
        },
      };
    }
  } else if (event.method == "PATCH") {
    const body = await readBody(event);
    if (body) {
      if (body.video) {
        const sqlVal = {
          title: body.video.title,
          description: body.video.description,
          stream_id: body.video.stream_id,
          stream_key: body.video.stream_key,
          cover: body.video.cover,
          source: body.video.source,
        };
        const updateRes = await useDrizzle()
          .update(tables.videos)
          .set(sqlVal)
          .where(eq(tables.videos.id, 1));
        if (updateRes.changes < 1) {
          await useDrizzle().insert(tables.videos).values(sqlVal);
        }
      }
      if (body.mqtt) {
        const sqlVal = {
          host: body.mqtt.host,
          port: body.mqtt.port,
          topic: body.mqtt.topic,
          qos: body.mqtt.qos,
          path: body.mqtt.path,
          connect_timeout: body.mqtt.connect_timeout,
        };
        const updateRes = await useDrizzle()
          .update(tables.mqtt)
          .set(sqlVal)
          .where(eq(tables.mqtt.id, 1));
        if (updateRes.changes < 1) {
          await useDrizzle().insert(tables.mqtt).values(sqlVal);
        }
      }
      return { status: 200, mss: "success" };
    }
  }
});
