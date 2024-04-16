import Database from "better-sqlite3";
import { tables, useDrizzle } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let mss = "";
  let statusCode = 200;
  let users: Database.RunResult | Object | null = null;
  const session = await useSession(event, {
    password: config.SECRETKEY,
  });

  if (event.method == "DELETE") {
    const body = await readBody(event);
    if (body && body.id) {
      users = await useDrizzle()
        .delete(tables.users)
        .where(eq(tables.users.id, body.id));
      mss = "success";
    }

    return {
      status: statusCode,
      mss,
      body: users,
    };
  } else {
    users = (useDrizzle().select().from(tables.users).all()).map((v) => {
      v.password = "";
      return v;
    });
  }
  return {
    status: statusCode,
    mss,
    body: users,
  };
});
