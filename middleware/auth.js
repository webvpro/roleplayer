export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth()
  if (process.client) {
    if (user.value) {
      return
    }
    return navigateTo({ name: 'login' })
  }
})
