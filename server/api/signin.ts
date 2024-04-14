import useAcc from "~/composables/useAcc";
import { tables, useDrizzle } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let mss = "";
  let statusCode = 404;
  const body = await readBody(event).catch(() => {});
  const session = await useSession(event, {
    password: config.SECRETKEY,
  });
  let users: any[] = [];
  if (body && body.username) {
    if (body.password) {
      users = await useDrizzle()
        .select()
        .from(tables.users)
        .where(
          and(
            eq(tables.users.username, body.username),
            eq(tables.users.password, body.password)
          )
        );
      if (users.length > 0) {
        mss = "success";
        statusCode = 200;
        delete users[0].password;
        await session.update({acc:users[0]})
      } else {
        users = await useDrizzle()
        .select()
        .from(tables.users)
        .where(eq(tables.users.username, body.username));
        mss = "fail : "+users[0].password;
        statusCode = 400;
      }
    } else {
      users = await useDrizzle()
        .select()
        .from(tables.users)
        .where(eq(tables.users.username, body.username));
      if (users.length > 0) {
        mss = "found user";
        statusCode = 200;
      } else if (config.ADMIN_USERNAME == body.username) {
        await useDrizzle().insert(tables.users).values({
          username: config.ADMIN_USERNAME,
          password: config.ADMIN_PASSWORD,
          displayName: config.ADMIN_USERNAME,
        });
        mss = "found user";
        statusCode = 200;
      } else {
        mss = "not found user";
        statusCode = 404;
      }
    }
  }
  return {
    status: statusCode,
    mss,
  };
});
