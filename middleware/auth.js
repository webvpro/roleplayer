
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, refresh } = useAuth()
  
  if(process.client) {
  await refresh()
     console.log(user.value)
    if (user.value) {
      return
    } else {
      return navigateTo('/login')
    }
  }  
  
})
