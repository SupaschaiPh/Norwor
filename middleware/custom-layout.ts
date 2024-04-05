export default defineNuxtRouteMiddleware((to,from) => {
    // Set the layout on the route you are navigating _to_
    setPageLayout("blank")
  })
  