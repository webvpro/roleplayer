import { useAuth } from '../composables/useAuth.js';
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth()
   if (user.value) {
      return
    }
    return navigateTo({ name: 'login' })
  
})
