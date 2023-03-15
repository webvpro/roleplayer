
export default defineNuxtRouteMiddleware(async (to,from) => {
     
    const user = useUser()
    console.log(useState('user'))
    if (user.value) {
      if(process.server)
        return
    }
    console.log('middleware auth', user) 
    return navigateTo({ name: 'login' })
  })