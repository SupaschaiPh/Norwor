export default defineNuxtRouteMiddleware(async (to,from) => {
    // Set the layout on the route you are navigating _to_
    // console.log(to.fullPath);
    // console.log(from);
    
    const sess = useAcc();
    if (!sess.value) {
        await $fetch<{acc : userSession}>('/api/session').then((res) => {
            sess.value = res.acc
        });
    }
    // const adminPath = ["/admin/account", "/admin/setting", "/admin/docs"];
    // console.log(adminPath.includes(to.fullPath));
    if (!to?.meta?.meta?.permitted.includes(sess?.value?.username)) {
        throw createError({
            statusCode: 403,
            statusMessage: "You don't have privilege to access this page",
        })
    }
  })
  