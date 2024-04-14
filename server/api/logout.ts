import useAcc from "~/composables/useAcc";

export default defineEventHandler(async (event) => {
  const config = await useRuntimeConfig();
  const session = await useSession(event, {
    password: config.SECRETKEY,
  });
  await session.clear();
  return {
    status: 200,
    mss: "success",
  };
});
