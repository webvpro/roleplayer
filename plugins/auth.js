import {useUser, fetchCurrentUser} from '../composables/useAuth.js';
export default defineNuxtPlugin(async () => {
  const { user, refresh } = useAuth()
  
  if(process.client) {
    await refresh()
    //console.log('plug-in auth', user.value)
    if (user.value !== undefined) return
  }
    
  });